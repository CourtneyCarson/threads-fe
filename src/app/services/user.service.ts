import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviornment } from '../enviornment';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey = 'user';
  router = inject(Router);

  userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  user = this.userSubject.asObservable();

  public get userValue() {
    return this.userSubject.value;
  }

  // for little test user only, not prod signup
  createUser(name: string) {
    return this.http.post<User>(`${enviornment.apiBaseUrl}/users`, {
      name,
    });
  }

  // for real sign up
  registerUser(
    name: string,
    username: string,
    password: string
  ): Observable<User> {
    return this.http
      .post<User>(`${enviornment.apiBaseUrl}/users/register`, {
        name,
        username,
        password,
      })

      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.localStorageKey, JSON.stringify(user));
          this.userSubject.next(user);
          if (user) {
            this.router.navigate(['/home']);
          }
          return user; // Return the user object as an observable value
        })
      );
  }

  // login user
  login(username: string, password: string) {
    return this.http
      .post<User>(`${enviornment.apiBaseUrl}/users/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.localStorageKey, JSON.stringify(user));
          this.userSubject.next(user);
          if (user) {
            this.router.navigate(['/home']);
          }

          return user;
        })
      );
  }

  // remove user from local storage to log user out
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
