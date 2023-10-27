import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviornment } from '../enviornment';
import { User } from '../interfaces/user.interface';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey = 'threads-user';
  router = inject(Router);

  // for little test user only, not prod signup
  createUser(name: string) {
    return this.http.post<User>(`${enviornment.apiBaseUrl}/users`, {
      name,
    });
  }

  // for real sign up
  registerUser(name: string, username: string, password: string) {
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
          if (user) {
            this.router.navigate(['/home']);
          }
          return user;
        })
      );
  }

  // saveUserToStorage(user: User) {
  //   localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  // }

  getUserFromStorage() {
    const user = localStorage.getItem(this.localStorageKey);
    // console.log('user at getuserfromstorage', user);
    return user ? JSON.parse(user) : null;
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
          if (user) {
            this.router.navigate(['/home']);
          }
          return user;
        })
      );
  }

  // remove user from local storage to log user out
  logout() {
    localStorage.removeItem(this.localStorageKey);
    this.router.navigate(['/login']);
  }
}
