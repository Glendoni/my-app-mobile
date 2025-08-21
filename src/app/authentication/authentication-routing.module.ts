import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {LinkCheckerComponent} from "./link-checker/link-checker.component";
import {ProfileComponent} from "./user/profile/profile.component";

const routes: Routes = [
  {
  path: '',
  component: SigninComponent,
  pathMatch: 'full'
  // loadChildren: './landing/landing.module#LandingModule'
},
  {
  path: 'link-checker',
  component: LinkCheckerComponent,
  pathMatch: 'full'
  // loadChildren: './landing/landing.module#LandingModule'
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
