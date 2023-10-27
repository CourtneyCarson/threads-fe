import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviornment } from '../enviornment';
import { User } from '../interfaces/user.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  localStorageKey = 'threads-user';

  createUser(name: string) {
    return this.http.post<User>(`${enviornment.apiBaseUrl}/users`, { name });
  }

  saveUserToStorage(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromStorage() {
    const user = localStorage.getItem(this.localStorageKey);
    console.log('user at getuserfromstorage', user);
    return user ? JSON.parse(user) : null;
  }

  // login user
  login(username: string, password: string) {
    console.log('login service', username, password);
    return this.http
      .post<User>(`${enviornment.apiBaseUrl}/users/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.localStorageKey, JSON.stringify(user));
          console.log('user at login after service call');
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.localStorageKey);
  }
}
