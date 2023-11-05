import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userService = inject(UserService);

  profileForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  showPassword: boolean = false;
  user = this.userService.userValue;

  ngOnInit() {
    this.profileForm.patchValue({
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
    });
  }

  submitLogin() {
    const formValue = {
      name: this.profileForm.value.name,
      username: this.profileForm.value.username,
      password: this.profileForm.value.password,
    };

    if (!formValue.name || !formValue.username || !formValue.password) {
      return;
    }

    console.log('formValue', formValue);
    // this.userService.login(formValue.username, formValue.password).subscribe(
    //   (user) => {
    //     // console.log(user);
    //   },
    //   (error) => {
    //     console.log('An error occured while logging in', error);
    //   }
    // );
  }

  // show password
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
