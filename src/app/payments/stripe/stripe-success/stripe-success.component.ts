import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../_services";

@Component({
  selector: 'app-stripe-success',
  templateUrl: './stripe-success.component.html',
  styleUrls: ['./stripe-success.component.css']
})
export class StripeSuccessComponent implements OnInit{
  public message: any = [];

  constructor( private route: ActivatedRoute,
               private authenticationService: AuthenticationService,
               private router: Router) {
  }

  ngOnInit() {
    const user = localStorage.getItem('currentUser')
    let obj = JSON.parse(JSON.stringify(user))??{};

    var email =JSON.parse(obj).email
    console.log(encodeURIComponent(email))
    this.route.queryParams.subscribe(params => {

    this.subscribeUser(params['payment_intent_client_secret']);

    });


  }

  subscribeUser(params:string){

    this.authenticationService.stripePaymentConfirmation(params).subscribe((data:any) =>{

      this.message = ['Thank you for upgrading your subscription', 'Upgrade changes should apply straight away']
    },
      (error:any) => {
        this.message =
          [error.error.message, '']
      })
  }

  reloadApplication() {
    this.router.navigate(['survey'])
  }
}
