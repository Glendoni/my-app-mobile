import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {SurveyModule} from "./survey/survey.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';
import { CommunityModule } from './community/community.module';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AuthenticationService, UserService} from './_services';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpInterceptorProviders} from './_helpers';

import { TestComponent } from './test/test.component';

import { NgChartsModule } from 'ng2-charts';


export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http)
}
@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SurveyModule,
    NgbModule,
    AdminModule,
    CommunityModule,
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [
    AuthenticationService,
    UserService,
    httpInterceptorProviders
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
