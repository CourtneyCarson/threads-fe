import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn  {
return () => {
  const authServ: UserService = inject(UserService );

  if(authServ.getUserFromStorage()) {
    console.log('authguard allowed')
    return true;
  }
console.log('authguard blocked')
  return false;

};
}

// 

// check if the user is authenticated
// if not, redirect to login page

// return () => {
//     const oauthService: AuthService = inject(AuthService);
    
//     if (oauthService.hasAccess() ) {
//       return true;
//     }
//     oauthService.login();
//     return false;
//   };