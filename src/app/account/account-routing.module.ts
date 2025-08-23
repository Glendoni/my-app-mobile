import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AccountComponent} from "./account/account.component";
import {AuthGuard} from "../_guards";


const routes: Routes = [
  {
    path: '', component: AccountComponent,  canActivate: [AuthGuard]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {


}
