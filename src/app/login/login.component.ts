import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userService = inject(UserService);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  showPassword: boolean = false;

  submitLogin() {
    const formValue = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    if (!formValue.username || !formValue.password) {
      return;
    }

    this.userService.login(formValue.username, formValue.password).subscribe(
      (user) => {
        // console.log(user);
      },
      (error) => {
        console.log('An error occured while logging in', error);
      }
    );
  }

  // show password
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
