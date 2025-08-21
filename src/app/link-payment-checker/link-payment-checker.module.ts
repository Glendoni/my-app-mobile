import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPaymentCheckerComponent } from './link-payment-checker.component';
import {Routes} from "@angular/router";


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LinkPaymentCheckerRoutingModule} from "./link-payment-checker-routing.module";
import { OnboardingAddPasswordComponent } from './onboarding-add-password/onboarding-add-password.component';

const routes: Routes = [{
  path: '',
  component: LinkPaymentCheckerComponent
  // loadChildren: './landing/landing.module#LandingModule'
}];

@NgModule({
  declarations: [
    LinkPaymentCheckerComponent,
    OnboardingAddPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LinkPaymentCheckerRoutingModule,
    ReactiveFormsModule
  ]
})
export class LinkPaymentCheckerModule { }
