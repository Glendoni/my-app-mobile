import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StripeSuccessComponent} from "./stripe/stripe-success/stripe-success.component";
import {AuthGuard} from "../_guards";

const routes: Routes = [

  {
    path: '', component:StripeSuccessComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
