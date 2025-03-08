
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationRepository
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = this.authenticationService.getCurrentUserValue;
    let snapshot = route.routeConfig?.path;

    if (currentUser) {
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');
      if (helper.isTokenExpired(token!)) {
        this.authenticationService.clearUser();
        //this.router.navigate(['/auth/']);
        setTimeout(() => {
          //error
        }, 100);
        return false;
      } else if (snapshot === 'auth') {
        // this.router.navigate(['/pages/']);
        return false;
      } else {
        return true;
      }
    } else {
      //this.router.navigate(['/auth/']);
      setTimeout(() => {
        //error
      }, 100);
      return false;
    }

    /*if (currentUser) {


      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');
      if (helper.isTokenExpired(token + "")) {
        this.authenticationService.clearUser();
        this.router.navigate(['/auth/']);
        setTimeout(() => {
          //lanzar expecion popo mensaje
        }, 100);
        return false;
      }
      /*else if (y.path === "auth") {
        this.router.navigate(['/pages/']);
        return false;
      }
      else {
        return true;
      }
    } else {
      this.router.navigate(['/auth/']);
      setTimeout(() => {
        //lanzar expecion popo mensaje
      }, 100);
      return false;
    }*/
    //  return true;
  }
}
