import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {AbstractControl, ValidationErrors, ɵElement, ɵValue} from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  question: any = []
  opt: any = []
  public url
  public buttonVisibility: any = new Subject<boolean>();

  private routerInfo: BehaviorSubject<boolean>;
  public options: BehaviorSubject<[]>;
  public chartFillOptions: BehaviorSubject<[]>;
  public boxOptionAutoFillers: BehaviorSubject<[]>;
  appendQuestion: BehaviorSubject<string>;
  private questionToBeRemoved: BehaviorSubject<string>;
  private questions: BehaviorSubject<[]>;
  private studyCategories: BehaviorSubject<[]>;
  private showDashboard: any;
  private selectedQuestion: BehaviorSubject<any>;
  private inputBoxOptional: BehaviorSubject<boolean>;
  private ResultsTab: BehaviorSubject<boolean>;
  private dashboardRedirect: BehaviorSubject<boolean>;
  private addQuestionBtnVisibility: BehaviorSubject<boolean>;
  private addQuestion: BehaviorSubject<boolean>;
  private getQuestionMenuRefresh: BehaviorSubject<string>;
  private chartType: BehaviorSubject<any>;
  private chartReportPagination: BehaviorSubject<number>;

  constructor(private http: HttpClient, protected alertService: AlertService, private authenticationService: AuthenticationService) {
    this.routerInfo = new BehaviorSubject<boolean>(false);
    this.showDashboard = new BehaviorSubject<boolean>(false);
    this.inputBoxOptional = new BehaviorSubject<boolean>(false);
    this.dashboardRedirect = new BehaviorSubject<boolean>(false);
    this.addQuestionBtnVisibility = new BehaviorSubject<boolean>(false);
    this.addQuestion = new BehaviorSubject<boolean>(false);
    this.ResultsTab = new BehaviorSubject<boolean>(false);
    this.options = new BehaviorSubject<[]>([]);
    this.chartFillOptions = new BehaviorSubject<[]>([]);
    this.boxOptionAutoFillers = new BehaviorSubject<[]>([]);
    this.appendQuestion = new BehaviorSubject<string>('');
    this.selectedQuestion = new BehaviorSubject<any>('');
    this.questionToBeRemoved = new BehaviorSubject<string>('');
    this.chartReportPagination = new BehaviorSubject<number>(1);
    this.questions = new BehaviorSubject<[]>([]);
    this.studyCategories = new BehaviorSubject<[]>([]);
    this.getQuestionMenuRefresh = new BehaviorSubject<string>('');
    this.chartType = new BehaviorSubject<any>('');

    this.url = this.authenticationService.url
  }

  addQuestionArr($id: any) {
    this.question.push($id)
  }

  getButtonVisibility(): BehaviorSubject<boolean> {
    return this.buttonVisibility.asObservable()
  }


  setOptions(newValue: any): void {
    this.options.next(newValue);
  }

  getOptions(): Observable<any> {
    return this.options.asObservable();
  }

  setBoxOptions(newValue: boolean): void {
    this.inputBoxOptional.next(newValue);
  }

  getBoxOptions(): Observable<boolean> {
    return this.inputBoxOptional.asObservable();
  }

  setBoxAutoFillOptions(newValue: any): void {
    this.boxOptionAutoFillers.next(newValue);
  }

  getBoxAutoFillOptions(): Observable<any> {
    return this.boxOptionAutoFillers.asObservable();
  }

  setChartFillOptions(newValue: any): void {
    this.chartFillOptions.next(newValue);
  }

  getChartFillOptions(): Observable<any> {
    return this.chartFillOptions.asObservable();
  }

  setStudyCategories(newValue: any): void {
    this.studyCategories.next(newValue);
  }

  getStudyCategories(): Observable<any> {
    return this.studyCategories.asObservable();
  }


  setChartReportPagination(newValue: number): void {

    this.chartReportPagination.next(newValue);
  }

  getChartReportPagination(): Observable<number> {
    return this.chartReportPagination.asObservable();
  }

  setAppendQuestion(newValue: ɵValue<ɵElement<(string | ((control: AbstractControl) => (ValidationErrors | null)))[], null>> | undefined): void {
    if (typeof newValue === "string") {
      this.appendQuestion.next(newValue);
    }
  }

  getAppendQuestion(): Observable<any> {
    return this.appendQuestion.asObservable();
  }

  setQuestionToBeRemoved(newValue: any): void {
    // console.log('Servicing Question to be removed: ' + newValue)
    this.questionToBeRemoved.next(newValue);
  }

  getQuestionToBeRemoved(): Observable<any> {
    return this.questionToBeRemoved.asObservable();
  }

  setShowDashboard(showDashboard: boolean): void {
    // console.log('Set show Dashboard to true ')
    this.showDashboard.next(showDashboard);
  }

  getShowDashboard(): Observable<boolean> {
    // console.log('getShowDashboard ')
    return this.showDashboard.asObservable();
  }

  setOptionBtnSubmitVisibility(newValue: any): void {
    this.routerInfo.next(newValue);
  }

  getOptionBtnSubmitVisibility(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }

  setAddQuestion(newValue: boolean): void {
    this.addQuestion.next(newValue);
  }

  getAddQuestion(): Observable<boolean> {
    return this.addQuestion.asObservable();
  }

  setAddQuestionBtnVisibility(newValue: boolean): void {
    this.addQuestionBtnVisibility.next(newValue);
  }

  getAddQuestionBtnVisibility(): Observable<boolean> {
    return this.addQuestionBtnVisibility.asObservable();
  }

  setChartType(newValue: any): void {
    //console.log(newValue)
    this.chartType.next(newValue);
  }

  getChartType(): Observable<any> {
    return this.chartType.asObservable();
  }

  setQuestion(item: boolean): void {

    this.selectedQuestion.next(item);
  }

  getQuestion(): Observable<any> {

    return this.questions.asObservable();
  }

  getQuestionRefresh(): Observable<any> {
    return this.getQuestionMenuRefresh.asObservable();
  }

  redirectToDashboard(): Observable<boolean> {
    return this.dashboardRedirect.asObservable();
  }

  setRedirectToDashboard(): void {
    this.dashboardRedirect.next(true);
  }


  getStudyQuestions(studyId: string) {


    return this.http.get(this.url + '/api/question/' + studyId)
      .pipe(map((result: any) => {
        //this.questions = result;

        this.questions.next(result);
        //this.alertService.setAlert(result);
        return result
      }));
  }

  saveQuestionOrder(details: any) {
    // console.log(details)
  }

  dropOrder(value: any) {

    // console.log(value)
    //  return  this.http.post('http://localhost/api/question/'+ value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post(this.url + '/api/questionSortOrder', value, httpOptions)
      .pipe(map((result: any) => {
        this.alertService.setAlert('updated!');
        return result
      }));
  }

  update(value: any, id: string) {
    // console.log(value)
    //  return  this.http.post('http://localhost/api/question/'+ value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put(this.url + '/api/question/' + id, value, httpOptions)
      .pipe(map((res: any) => {
        this.alertService.setAlert('updated!');
        this.getQuestionMenuRefresh.next(res);
      }))

  }

  create(value: any, selectedFieldType: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post(this.url + '/api/question?' + selectedFieldType.toLowerCase(), value, httpOptions)
      .pipe(map((res: any) => {
      }))
  }

  setShowHideResultsTab(item: boolean): void {

    this.ResultsTab.next(item);
  }

  getShowHideResultsTab(): Observable<any> {

    return this.ResultsTab.asObservable();
  }

  getAutoFillOptions(fillId: string) {


    return this.http.get(this.url + '/api/autoFill/' + fillId)
      .pipe(map((result: any) => {
        //this.questions = result;
//console.log(result)
        // this.questions.next(result);
        //this.alertService.setAlert(result);
        return result
      }));
  }

  getCategories(studyId: string) {


    return this.http.get(this.url + '/api/category/' + studyId)
      .pipe(map((result: any) => {
        //this.questions = result;
//console.log(result)
        // this.questions.next(result);
        //this.alertService.setAlert(result);
        return result
      }));
  }
}




