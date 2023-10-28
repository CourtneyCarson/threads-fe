import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export function authGuard(): CanActivateFn {
  return () => {
    const authServ: UserService = inject(UserService);
    const router: Router = inject(Router);

    // const isUserInStorage = authServ.getUserFromStorage();
    const isUserInStorage = authServ.userValue;

    // const user = this.userService.userValue;

    if (isUserInStorage) {
      // console.log('authguard allowed');
      router.createUrlTree(['/home']);
      return true;
    }

    router.navigate(['/login']);
    // console.log('authguard blocked');
    return false;
  };
}
