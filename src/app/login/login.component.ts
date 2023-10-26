import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userService = inject(UserService);

//  need to hit and sub to the login service here - username, password
//   login() {
// this.userService.login(username, password).subscribe((user) => {
//   console.log(user);

//   }

}
