import {Injectable} from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: 'root'})
export class StripeService {

  public url

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

    this.url =this.authenticationService.url
  }

  getLatestInvoice() {
    return this.http.get(this.url + '/api/stripeTests');

  }


}
