import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { StripeSuccessComponent } from './stripe/stripe-success/stripe-success.component';


@NgModule({
  declarations: [
    StripeSuccessComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
