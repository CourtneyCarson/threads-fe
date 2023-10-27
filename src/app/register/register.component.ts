import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userService = inject(UserService);

  registerForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  showPassword: boolean = false;

  submitregister() {
    console.log(this.registerForm.value);

    const formValue = {
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    };

    if (!formValue.name || !formValue.username || !formValue.password) {
      return;
    }

    this.userService
      .registerUser(formValue.name, formValue.username, formValue.password)
      .subscribe(
        (user) => {
          console.log(user);
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
