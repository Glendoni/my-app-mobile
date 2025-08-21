import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";
import {Data, IPreparePyamentRequest} from '../data';
@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  private httpOptions;
  public url
  public payment:any
  constructor(private http: HttpClient, private alertService: AlertService, private authenticationService: AuthenticationService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    };

    this.url = authenticationService.url
  }

  preparePayment(data: IPreparePyamentRequest, id: string) {

    return this.http.post(this.url + '/api/payment_intent/'+id,data,this.httpOptions)
      .pipe(map((result: any) => {
        return result.data
      }));
  }

  getProductPrice(productPricingId:string){
    return this.http.get(this.url + '/api/product_pricing/'+productPricingId,this.httpOptions)
      .pipe(map((result: any) => {
        return result
      }));
  }
}
