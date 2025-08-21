import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: 'root'})
export class UserService {


  pages = new Subject();

  public search = new Subject<string>();
 // public  currentUser = JSON.parse(localStorage.getItem('currentUser'))

public url

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

this.url =this.authenticationService.url
}

  getPremiumUsers() {
    return this.http.get(this.url + '/api/premiumUsers');

  }


  getProfile() {
    return this.http.get(this.url + '/api/profile');
  }

  getRecoveryCodes() {
    return this.http.get(this.url + '/api/getRecoveryCodes');
  }

  disableTwoFactor() {
    return this.http.get(this.url + '/api/updateTwoFactorStatus');
  }

  getNewRecoveryCodes() {
    return this.http.get(this.url + '/api/regenerateRecoveryCodes');
  }

  getUserQrCodeSvg() {
    return this.http.get(this.url + '/api/getUserQrCodeSvg');
  }
  deactivateQrCodeRequirement() {
    return this.http.get(this.url + '/api/deactivateQrCodeRequirement');
  }
  activateQrCodeRequirement() {
    return this.http.get(this.url + '/api/activateQrCodeRequirement');
  }
}
