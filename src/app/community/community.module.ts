import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';

import { CommunityComponent } from './community.component';

import { ShortlistedComponent } from './shortlisted/shortlisted.component';
import { JoinRequestsComponent } from './join-requests/join-requests.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MultiSelectDropdownComponent } from '../multi-select-dropdown/multi-select-dropdown.component';
import { TesterComponent } from './tester/tester.component';
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        CommunityComponent,
        ShortlistedComponent,
        JoinRequestsComponent,
        MultiSelectDropdownComponent,
        TesterComponent,
    ],
    // exports: [
    //     CommunityComponent
    // ],
    imports: [
      RouterModule,

        CommonModule,
        CommunityRoutingModule,
        ReactiveFormsModule,
      FormsModule,

    ]
})
export class CommunityModule { }
