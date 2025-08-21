import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionsComponent} from "./questions/questions.component";
import {SurveyListingComponent} from "./survey-listing/survey-listing.component";
import {StudyListingComponent} from "./studies/study-listing/study-listing.component";
import {StudiesComponent} from "./studies/studies/studies.component";
import {AuthGuard} from "../_guards";

const routes: Routes = [
  {
    path: 'survey-listing', component: SurveyListingComponent,
  },
  {
    path: '', component: StudiesComponent, canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule {
}
