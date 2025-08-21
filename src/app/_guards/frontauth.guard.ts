import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class FrontauthGuard  {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // if (!localStorage.getItem('currentUser')) {
    //   this.router.navigate(['landing']);
    //   return false;
    // }
    return true;

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['author']);
    // return false;
  }
}
