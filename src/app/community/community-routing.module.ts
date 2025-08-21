import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InviteComponent} from "./invite/invite.component";
import {CommunityComponent} from "./community.component";
import {JoinRequestsComponent} from "./join-requests/join-requests.component";
import {TestComponent} from "../test/test.component";

const routes: Routes = [

  {
    path: '', component: CommunityComponent,
    children: [
  {
    path: 'tester/:id',
    component: TestComponent
  }],

  },{
    path: 'tester',
    component: TestComponent
  },
  { path: '', redirectTo: 'community', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule {
}
