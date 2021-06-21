import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
// import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}
  // : Observable<HttpEvent<unknown>>
  intercept(req: HttpRequest<any>, next: HttpHandler){

    const authtoken = this.authService.getToken();
    const authRequest= req.clone({
      headers: req.headers.set("Authorization","Bearer " + authtoken)
    });

    return next.handle(authRequest);
  }
}
