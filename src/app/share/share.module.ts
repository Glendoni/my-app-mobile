import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import {TermsComponent} from "./terms/terms.component";
import {PrivatePolicyComponent} from "./private-policy/private-policy.component";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    BaseComponent,
    TermsComponent,
    PrivatePolicyComponent
  ],
  exports: [
    BaseComponent, TermsComponent, CommonModule,  PrivatePolicyComponent
  ],
  imports: [
    CommonModule, FormsModule, TranslateModule,

  ]
})
export class ShareModule { }
