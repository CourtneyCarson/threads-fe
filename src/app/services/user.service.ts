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
  localStorageKey = 'token';
  router = inject(Router);
  // userSubject = new BehaviorSubject<User | null>(null);
  userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  user = this.userSubject.asObservable();

  public get userValue() {
    console.log('when is this hit?', this.userSubject.value);
    return this.userSubject.value;
  }

  // for little test user only, not prod signup
  createUser(name: string) {
    return this.http.post<User>(`${enviornment.apiBaseUrl}/users`, {
      name,
    });
  }

  // for real sign up
  // registerUser(name: string, username: string, password: string) {
  //   return this.http
  //     .post<User>(`${enviornment.apiBaseUrl}/users/register`, {
  //       name,
  //       username,
  //       password,
  //     })
  //     .pipe(
  //       map((user) => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  //         if (user) {
  //           this.router.navigate(['/home']);
  //         }
  //         console.log('return user at register', user)
  //         return user;
  //       })
  //     );
  // }

  // register(user: User) {
  //   return this.http.post(`${enviornment.apiBaseUrl}/users/register`, user);
  // }

  // above returns the success message, but I need the actual user observable to be returned
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
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          if (user) {
            this.router.navigate(['/home']);
          }
          console.log('return user at register', user);
          return user; // Return the user object as an observable value
        })
      );
  }

  // saveUserToStorage(user: User) {
  //   localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  // }

  // // grab user from local storage
  // getUserFromStorage() {
  //   const user = localStorage.getItem(this.localStorageKey);
  //   console.log('user at getuserfromstorage', user);
  //   return user ? JSON.parse(user) : null;
  // }

  // getToken(): string | null {
  //   return this.token || localStorage.getItem('authToken');
  // }

  // login user
  login(username: string, password: string) {
    return this.http
      .post<User>(`${enviornment.apiBaseUrl}/users/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          console.log('return user at login', user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
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
