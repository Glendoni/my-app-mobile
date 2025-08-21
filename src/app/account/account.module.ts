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
import {PricingDetailsComponent} from './pricing-comparison/pricing-details/pricing-details.component';
import {InvoiceComponent} from './invoice/invoice.component';
import { CustomerTermsComponent } from './pricing-comparison/customer-terms/customer-terms.component';
import { CustomerPrivacyPolicyComponent } from './pricing-comparison/customer-privacy-policy/customer-privacy-policy.component';
import { CheckoutComponent } from './pricing-comparison/checkout/checkout.component';
import { SubscriptionDetailsComponent } from './subscription-details/subscription-details.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";



@NgModule({
  declarations: [
    AccountComponent,
    NotificationsComponent,
    ProfileComponent,
    GoogleAuthenticatorComponent,
    SvgImgComponent,
    PricingComparisonComponent,
    PricingDetailsComponent,
    InvoiceComponent,
    CustomerTermsComponent,
    CustomerPrivacyPolicyComponent,
    CheckoutComponent,
    SubscriptionDetailsComponent
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
