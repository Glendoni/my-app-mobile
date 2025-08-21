import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import {DynamicFieldComponent} from "../components/dynamic-field/dynamic-field.component";
import {DynamicFormComponent} from "../components/dynamic-form/dynamic-form.component";
import {DynamicInputComponent} from "../components/dynamic-field/dynamic-input/dynamic-input.component";
import {DynamicSelectComponent} from "../components/dynamic-field/dynamic-select/dynamic-select.component";
import {DynamicRadioComponent} from "../components/dynamic-field/dynamic-radio/dynamic-radio.component";
import {DynamicCheckboxsComponent} from "../components/dynamic-field/dynamic-checkboxs/dynamic-checkboxs.component";
import {DynamicErrorComponent} from "../components/dynamic-form/dynamic-error/dynamic-error.component";
import {ProfileComponent} from "./user/profile/profile.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LinkCheckerComponent } from './link-checker/link-checker.component';
import {ShareModule} from "../share/share.module";


@NgModule({
    declarations: [
        DynamicFieldComponent,
        DynamicFormComponent,
        DynamicInputComponent,
        DynamicSelectComponent,
        DynamicRadioComponent,
        DynamicCheckboxsComponent,
        DynamicErrorComponent,
        SigninComponent,
        ProfileComponent,
        ResetPasswordComponent,
        LinkCheckerComponent
    ],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
      ShareModule
    ]
})
export class AuthenticationModule { }
