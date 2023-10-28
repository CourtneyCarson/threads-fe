import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  upcoming_features = [
    // { feat: 'Auth JWT Token Login and Signup' },
    { feat: 'Google Oauth Login and Signup' },
    { feat: 'Ability To Post Images, Not Just Comments' },
    { feat: '  Ability To Like Posts' },
    { feat: ' Ability To Delete Posts' },
    { feat: ' Ability To Update User Profile' },
    { feat: ' Ability To Follow Other Users' },
  ];
}
