import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const authServ: UserService = inject(UserService);
    const router: Router = inject(Router);

    const isUserInStorage = authServ.getUserFromStorage();

    if (isUserInStorage) {
      console.log('authguard allowed');
      router.createUrlTree(['/home']);
      return true;
    }
    //  else {
    // router.createUrlTree(['/login']);
    router.navigate(['/login']);
    // }
    console.log('authguard blocked');
    return false;
  };
}
