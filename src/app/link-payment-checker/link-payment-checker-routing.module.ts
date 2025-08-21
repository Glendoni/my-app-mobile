import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "../authentication/signin/signin.component";
import {LinkPaymentCheckerComponent} from "./link-payment-checker.component";


const routes: Routes = [{
  path: '',
  component: LinkPaymentCheckerComponent,
  pathMatch: 'full'
  // loadChildren: './landing/landing.module#LandingModule'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkPaymentCheckerRoutingModule { }
