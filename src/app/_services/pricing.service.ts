import {Injectable} from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: 'root'})
export class PricingService {
  private url
  constructor(private http: HttpClient, private alertService: AlertService, private authenticationService: AuthenticationService) {
    this.url =this.authenticationService.url
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPricing(){
    return this.http.get(this.url + '/api/pricing-comparison');
  }

  getPricingDetails(details:any){
    return this.http.get(this.url + '/api/pricing-comparison/'+details);
  }

  getSubscriptionDetails(details:any){
    return this.http.get(this.url + '/api/subscriptionDetails/'+details);
  }

  cancelSubscription(reason:any){
    return this.http.post(this.url + '/api/cancelSubscription', reason, this.httpOptions);
  }

  resumeSubscription(){
    return this.http.get(this.url + '/api/resumeSubscription',  this.httpOptions);
  }

  cancelPendingSubscription(productId:string){
    return this.http.get(this.url + '/api/cancelPendingSubscription/'+productId,  this.httpOptions);
  }

  // getStudyParticipants(studyId:string){
  //   return this.http.get(this.url + '/api/pricing/'+ studyId);
  // }

}
