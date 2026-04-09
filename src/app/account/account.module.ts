import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account/account.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileComponent} from './profile/profile.component';
import {ShareModule} from "../share/share.module";
import {GoogleAuthenticatorComponent} from './google-authenticator/google-authenticator.component';
import {SvgImgComponent} from './google-authenticator/svg-img/svg-img.component';
import {PricingComparisonComponent} from './pricing-comparison/pricing-comparison.component';
import {InvoiceComponent} from './invoice/invoice.component';

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {SocialFollowComponent} from "./social-follow/social-follow.component";



@NgModule({
  declarations: [
    AccountComponent,
    NotificationsComponent,
    ProfileComponent,
    GoogleAuthenticatorComponent,
    SvgImgComponent,
    InvoiceComponent,
    PricingComparisonComponent,
    SocialFollowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    ShareModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ]
})
export class AccountModule {
}
