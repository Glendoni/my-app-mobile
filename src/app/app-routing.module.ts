import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./authentication/user/profile/profile.component";
import {ResetPasswordComponent} from "./authentication/reset-password/reset-password.component";
import {BrowserModule} from "@angular/platform-browser";
import {TestComponent} from "./test/test.component";


const routes: Routes = [


  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'stripe-success', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'survey', loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule) },
  {path: 'profile', component: ProfileComponent},

  //{path: 'invite', loadChildren: () => import('./invite/invite.module').then(m=>m.InviteModule)},
  {
    path: 'test', component: TestComponent
  },
  {
    path: 'link-payment-checker', loadChildren: () => import('./link-payment-checker/link-payment-checker.module').then(m => m.LinkPaymentCheckerModule),
  },
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path: 'community', loadChildren: () => import('./community/community.module').then(m => m.CommunityModule)
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)
   // , RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
