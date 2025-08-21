import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {AlertService} from "./alert.service";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";


@Injectable()
export class AuthenticationService {
  configUrl = 'assets/config.json';

  url = '';
  private userDetails: BehaviorSubject<any>;
  private twoFactorRequired: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router,
              private loc: Location,
              private alertService: AlertService,
              private deviceService: DeviceDetectorService
  ) {
    this.userDetails = new BehaviorSubject<any>('');
    this.twoFactorRequired = new BehaviorSubject<boolean>(false);
    this.envSelector()
  }


  setTwoFactorRequired(newValue: any): void {
    this.twoFactorRequired.next(newValue);
  }

  getTwoFactorRequired(): Observable<boolean> {
    return this.twoFactorRequired.asObservable();
  }

  login(email: string, password: string, otp: bigint,  recovery_code:string): any {
  //console.log('chaps')
    localStorage.removeItem('currentUser');
    // localStorage.removeItem('plan');
    // this.whichDevice()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    };

    return this.http.post(this.url + '/api/login', JSON.stringify(
      {email: email, password: password, otp: otp, recovery_code: recovery_code}), httpOptions)
      .pipe(
        catchError((error: any) => {
          //this.options.next(newValue);



          if(error['error']['error'] == 'Invalid 2FA code'){

         //  console.log('set two factor')
            this.setTwoFactorRequired(true);
          }
          // Handle the error here
          console.log(error['error']['message'])
          this.alertService.setAlert(error['error']['data']['error']);
          // Optionally, re-throw the error or return a default value
          return throwError('Something went wrong');
        }),
        map((res: any) => {

          localStorage.removeItem('portId');
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(
            {
              email: res.data.email
              , token: res.data.token
              , url: this.url ?? null
              , envHost: res.data.envHost ?? null
              , phone: res.data.phone ?? null
              , adminUrl: res.data.adminUrl ?? null
              , studyListingFilter: res.data.studyListingFilter ?? null
              // , severUrl: res.data.envHost
            }));
          localStorage.setItem('username',
            res.data.user_details.name
          )
          this.userDetails.next(res.data.user_details);
          return res.data.url //'survey';
        }));
  }

  loginWithLink(paymentLinkId: string, password: string): any {
    localStorage.removeItem('currentUser');
    // localStorage.removeItem('plan');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post(this.url + '/api/loginWithPaymentLink', JSON.stringify({
      paymentLinkId: paymentLinkId,
      password: password
    }), httpOptions)
      .pipe(map((res: any) => {
        localStorage.removeItem('portId');
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(
          {
            email: res.data.email,
            token: res.data.token
            // , user: res.data.user_details
          }));
        return 'survey';
        // return res.redirect_url;
      }));
  }


  checkPaymentLink(email: string) {
    return this.http.get(this.url + '/api/loginCheckPayment/' + email)
      .pipe(map((res: any) => {
        localStorage.removeItem('portId');
        localStorage.removeItem('currentUser');
        return res;
      }));
  }

  public getUserDetails(): Observable<string> {
    return this.userDetails.asObservable();
  }

  changePassword(details: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    };
    return this.http.post(this.url + '/api/changePassword', details, httpOptions)
      .pipe(
        catchError((error: any) => {

          // Handle the error here
          console.error('An error occurred:', error);
          this.alertService.setAlert(error['error']['data']);
          // Optionally, re-throw the error or return a default value
          return throwError('Something went wrong');
        }),
        map((result: any) => {

          this.alertService.setAlert(result);
          return result
        }))
  }

  linkChecker(linkId: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    }

    return this.http.get(this.url + '/api/loginCheckPayment/' + linkId, httpOptions)
    // .pipe(map((res: any) => {
    //   return res;
    //
    // })
    //)
  }

  linkCheckerConfirm(details: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    }
    return this.http.post(this.url + '/api/loginConfirmPaymentDetails', details, httpOptions)
  }


  private envSelector() {

    var urlHost = 'http://localhost'

    if (isDevMode()) {

      const angularRoute = this.loc.path();

      const url = window.location.href;

      const domainAndApp = url.replace(angularRoute, '');
      let text = domainAndApp
      if (!text.search("localhost")) {
        urlHost = 'https://b2c-connect-5389da581818.herokuapp.com'
      }
    } else {
      urlHost = 'https://b2c-connect-5389da581818.herokuapp.com'
    }

    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
     // console.log('is mobile')
      urlHost = 'https://b2c-connect-5389da581818.herokuapp.com'
    }

    localStorage.setItem('severUrl',
      urlHost
    )

    this.url = urlHost
  }


  stripePaymentConfirmation(paymentConfirmation:string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    }
    return this.http.get(this.url + '/api/stripe/paymentConfirmation/'+ paymentConfirmation, httpOptions)
  }
  // handleError(result){
  //   return this.alertService.setAlert(result);
  //   console.log('I error')
  //
  // }
}


