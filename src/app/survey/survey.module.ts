import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionsComponent} from './questions/questions.component';
import {SurveyRoutingModule} from "./survey-routing.module";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FieldtypeComponent} from './fieldtype/fieldtype.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import {EditQuestionComponent} from './edit-question/edit-question.component';
import {TableDragandDropComponent} from './shared/table-dragand-drop/table-dragand-drop.component';
import {OptionsDragandDropComponent} from './shared/options-dragand-drop/options-dragand-drop.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SurveyListingComponent} from './survey-listing/survey-listing.component';
import {SurveyDetailComponent} from './survey-detail/survey-detail.component';
import {StudyListingComponent} from './studies/study-listing/study-listing.component';
import {StudyDetailsComponent} from './studies/study-details/study-details.component';
import {StudiesComponent} from './studies/studies/studies.component';
import {CategoriesComponent} from './studies/categories/categories.component';
import {SettingsComponent} from './studies/settings/settings.component';
import {SettingsDetailsComponent} from './studies/settings-details/settings-details.component';
import {CategoryDetailsComponent} from './studies/category-details/category-details.component';
import {ParticipantsComponent} from './participants/participants.component';
import {EditMultiSelectDropdownComponent} from './edit-multi-select-dropdown/edit-multi-select-dropdown.component';
import {DynamicFormComponent} from "./Components/dynamic-form/dynamic-form.component";
import {DynamicFieldComponent} from "./Components/dynamic-field/dynamic-field.component";
import {DynamicInputComponent} from "./Components/dynamic-field/dynamic-input/dynamic-input.component";
import {DynamicSelectComponent} from "./Components/dynamic-field/dynamic-select/dynamic-select.component";
import {DynamicRadioComponent} from "./Components/dynamic-field/dynamic-radio/dynamic-radio.component";
import {DynamicCheckboxsComponent} from "./Components/dynamic-field/dynamic-checkboxs/dynamic-checkboxs.component";
import {DynamicErrorComponent} from "./Components/dynamic-form/dynamic-error/dynamic-error.component";
import {ReportsComponent} from './reports/reports.component';
import {NgChartsModule} from "ng2-charts";
import {BarChartDataProcessorComponent} from './bar-chart-data-processor/bar-chart-data-processor.component';
import {MatrixComponent} from './matrix/matrix.component';
import {MenuComponent} from './layout/menu/menu.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavFixedTopComponent} from './layout/nav-fixed-top/nav-fixed-top.component';
import {StudyListComponent} from './study-list/study-list.component';
import {QCenterComponent} from './questions/partials/q-center/q-center.component';
import {QLeftSummaryComponent} from './questions/partials/q-left-summary/q-left-summary.component';
import {QTabsComponent} from './questions/partials/q-tabs/q-tabs.component';
import {QHeaderComponent} from './questions/partials/q-header/q-header.component';
import {QRightAppMenuComponent} from './questions/partials/q-right-app-menu/q-right-app-menu.component';
import {QAddQuestionButtonComponent} from './questions/partials/q-add-question-button/q-add-question-button.component';
import {QResultQuotaComponent} from './questions/partials/results/q-result-quota/q-result-quota.component';
import {QResultChartsComponent} from './questions/partials/results/q-result-charts/q-result-charts.component';
import {QuestionsDragAndDropComponent} from './shared/questions-drag-and-drop/questions-drag-and-drop.component';
import {CreateQuestionOptionsComponent} from './shared/create-question-options/create-question-options.component';
import {ParticipantInviteComponent} from './studies/participant-invite/participant-invite.component';
import {
  EditMultipleSelectDropdownParticipantComponent
} from './edit-multiple-select-dropdown-participant/edit-multiple-select-dropdown-participant.component';
import {AlertsComponent} from "../shared/alerts/alerts.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { OptionNumberFieldComponent } from './shared/option-number-field/option-number-field.component';
import { EditorFieldComponent } from './shared/editor-field/editor-field.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import { QuestionOtherComponent } from './reports/question-other/question-other.component';
import {QRCodeModule} from "angularx-qrcode";
import {AuthGuard} from "../_guards";
import { FilterComponent } from './reports/filter/filter.component';
import { QResultMatrixComponent } from './questions/partials/results/q-result-matrix/q-result-matrix.component';
import { SetupIllustrationComponent } from './setup-illustration/setup-illustration.component';
import { PieChartProcessorComponent } from './charts/pie-chart-processor/pie-chart-processor.component';
import { DoughnutChartProcessorComponent } from './charts/doughnut-chart-processor/doughnut-chart-processor.component';
import { BarChartHorizontalProcessorComponent } from './charts/bar-chart-horizontal-processor/bar-chart-horizontal-processor.component';
import { UpgradeNotificationComponent } from './studies/upgrade-notification/upgrade-notification.component';
import { QrCodeComponent } from './studies/qr-code/qr-code.component';
import { AveragesComponent } from './reports/averages/averages.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    FieldtypeComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    TableDragandDropComponent,
    OptionsDragandDropComponent,
    SurveyListingComponent,
    SurveyDetailComponent,
    StudyListingComponent,
    StudyDetailsComponent,
    StudiesComponent,
    CategoriesComponent,
    SettingsComponent,
    SettingsDetailsComponent,
    CategoryDetailsComponent,
    ParticipantsComponent,
    EditMultiSelectDropdownComponent,
    DynamicFieldComponent,
    DynamicFormComponent,
    DynamicInputComponent,
    DynamicSelectComponent,
    DynamicRadioComponent,
    DynamicCheckboxsComponent,
    DynamicErrorComponent,
    ReportsComponent,
    BarChartDataProcessorComponent,
    MatrixComponent,
    MenuComponent,
    FooterComponent,
    NavFixedTopComponent,
    StudyListComponent,
    QCenterComponent,
    QLeftSummaryComponent,
    QTabsComponent,
    QHeaderComponent,
    QRightAppMenuComponent,
    QAddQuestionButtonComponent,
    QResultQuotaComponent,
    QResultChartsComponent,
    QuestionsDragAndDropComponent,
    CreateQuestionOptionsComponent,
    ParticipantInviteComponent,
    EditMultipleSelectDropdownParticipantComponent,
    AlertsComponent,
    OptionNumberFieldComponent,
    EditorFieldComponent,
    QuestionOtherComponent,
    FilterComponent,
    QResultMatrixComponent,
    SetupIllustrationComponent,
    PieChartProcessorComponent,
    DoughnutChartProcessorComponent,
    BarChartHorizontalProcessorComponent,
    UpgradeNotificationComponent,
    QrCodeComponent,
    AveragesComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgxPaginationModule,
    AngularEditorModule,
    QRCodeModule
  ],
  providers:[
    AuthGuard
  ],
    exports: [
        FooterComponent,
        AlertsComponent
    ],
  bootstrap: [QuestionsComponent]
})
export class SurveyModule {
}
