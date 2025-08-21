import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('currentUser')){
      // this.router.navigate(['/']);
      return true;
    }
    this.router.navigate(['/auth']);
    return false;

  }

}
