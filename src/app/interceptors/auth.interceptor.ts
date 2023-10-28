import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
    console.log('in auth interceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the user's token from your authentication service
    // const token = this.userService.getUserFromStorage();
    const token = this.userService.userValue();
    if (token) {
      console.log('iftoken', token);
      // Clone the request and add the authorization header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the modified request to the next handler
    return next.handle(req);
  }
}

// export function AuthInterceptor(
//   request: HttpRequest<any>,
//   next: HttpHandlerFn
// ) {
//   // add auth header with jwt if user is logged in and request is to the api url
//   const token = inject(UserService);

//   if (token) {
//     // Clone the request and add the authorization header
//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

// Pass the modified requestuest to the next handler
// return next(request);

// const user = usersService.getToken();
// const isLoggedIn = user?.token;
// const isApiUrl = request.url.startsWith(environment.apiUrl);
// if (isLoggedIn && isApiUrl) {
//     request = request.clone({
//         setHeaders: { Authorization: `Bearer ${user.token}` }
//     });
// }

// return next(request);
// }
