import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userService = inject(UserService);
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    console.log(this.loginForm.value);

    const formValue = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    if (!formValue.username || !formValue.password) {
      return;
    }

    this.userService.login(formValue.username, formValue.password).subscribe(
      (user) => {
        console.log(user);
      },
      (error) => {
        console.log('An error occured while logging in', error);
      }
    );

    // catch errors
  }



}
