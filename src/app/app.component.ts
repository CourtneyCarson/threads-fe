import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // providers: [AuthInterceptor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'threads-app';

  userService = inject(UserService);

  constructor() {
    // const user = this.userService.getUserFromStorage();
    const user = this.userService.userValue;

    console.log('user', user);
    // if (!user) {
    //   const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
    //   const randomName = `user_${randomNumber}`;
    //   this.userService.createUser(randomName).subscribe((user) => {
    //     console.log('user created', user);
    //     this.userService.saveUserToStorage(user);
    //   });
    // }
  }

  logout() {
    this.userService.logout();
  }
}
