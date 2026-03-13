import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordLinkCheckerComponent } from './reset-password-link-checker/reset-password-link-checker.component';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {LandingComponent} from "../landing/landing.component";
// import {AppComponent} from "../app.component";
// import {LinkComponent} from "../link-checker/link/link.component";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [{
  path: '',
  component: ResetPasswordLinkCheckerComponent,
  pathMatch: 'full'
  // loadChildren: './landing/landing.module#LandingModule'
}];
@NgModule({
  declarations: [
    ResetPasswordLinkCheckerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],

  bootstrap: [ResetPasswordLinkCheckerComponent]
})
export class ResetPasswordModule { }
