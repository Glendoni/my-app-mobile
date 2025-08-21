import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from "./alert.service";
import {BehaviorSubject, Subject, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";
import contains from "@popperjs/core/lib/dom-utils/contains";


@Injectable({
  providedIn: 'root'
})
export class StudyService {
  public options: BehaviorSubject<[]>;
  public portalStudies: BehaviorSubject<[]>;
  public portalStudiesRefresh: BehaviorSubject<[]>;
  public createCategoryToggle: BehaviorSubject<boolean>;
  public createCategoryToggleClose: BehaviorSubject<boolean>;
  public activemode: BehaviorSubject<boolean>;
  public activeGlobalMode: BehaviorSubject<boolean>;

  private inviteRedirect: BehaviorSubject<boolean>;
  private httpOptions;
  public url

  constructor(private http: HttpClient, private alertService: AlertService, private authenticationService: AuthenticationService) {
    this.options = new BehaviorSubject<[]>([]);
    this.portalStudies = new BehaviorSubject<[]>([]);
    this.portalStudiesRefresh = new BehaviorSubject<[]>([]);

    this.createCategoryToggle = new BehaviorSubject<boolean>(false);
    this.createCategoryToggleClose = new BehaviorSubject<boolean>(false);
    this.inviteRedirect = new BehaviorSubject<boolean>(false);
    this.activemode = new BehaviorSubject<boolean>(false);
    this.activeGlobalMode = new BehaviorSubject<boolean>(false);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    };
    this.url = authenticationService.url
  }

  getPortalStudies() {
    const fill = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.get(this.url + '/api/study', this.httpOptions)
      .pipe(map((result: any) => {
        const portId = localStorage.getItem('portId') || null
        if (!portId) {
          localStorage.setItem('portId', String(result.data[0].portal_id))
        }
        return result.data
      }));
  }

  getPortalCategories(studyId: string) {
    return this.http.get(this.url + '/api/category/' + studyId);
  }

  setPortalCategories(studyId: string) {
    return this.http.post(this.url + '/api/category', studyId, this.httpOptions)
      .pipe(
        map((result: any) => {
          this.alertService.setAlert(result);
          return result
        }))
  }

  updatePortalCategories(studyId: string, id: string) {
    return this.http.put(this.url + '/api/category/' + id, studyId, this.httpOptions)
      .pipe(map((result: any) => {
        return result
      }));
  }

  getPortalStudy(id: string) {
    return this.http.get(this.url + '/api/study/' + id, this.httpOptions);
  }
  getparticipantCategories(StudyId: string) {
    return this.http.get(this.url + '/api/getStudyCategories/' + StudyId, this.httpOptions);
  }

  addNewStudy(study: string) {
    return this.http.post(this.url + '/api/study', study, this.httpOptions)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  updateNewStudy(study: string, studyId: string) {
    return this.http.put(this.url + '/api/study/' + studyId, study, this.httpOptions)
      .pipe(map((result: any) => {

        this.alertService.setAlert(result);
        return result
      }));
  }

  globalSettings(settings: string) {
    return this.http.post(this.url + '/api/preference', settings, this.httpOptions)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  globalSettingsUpdate(settings: string) {
    return this.http.put(this.url + '/api/preference/123', settings, this.httpOptions)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  getGlobalSettings() {
    return this.http.get(this.url + '/api/preference')
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  setOptions(newValue: any): void {
    this.options.next(newValue);
  }

  getOptions(): Observable<any> {
    return this.options.asObservable();
  }

  getStudyRefresh(): Observable<any> {
    return this.portalStudies.asObservable();
  }

  setStudyRefresh(newValue: any): void {

    this.portalStudies.next(newValue);
  }

  getActiveMode(): Observable<any> {
    return this.activemode.asObservable();
  }

  setActiveMode(newValue: any): void {

    this.activemode.next(newValue);
  }
  getGlobalActiveMode(): Observable<any> {
    return this.activeGlobalMode.asObservable();
  }

  setGlobalActiveMode(newValue: any): void {

    this.activeGlobalMode.next(newValue);
  }

  getStudyRefresher(): Observable<any> {
    return this.portalStudies.asObservable();
  }

  setStudyRefresher(newValue: any): void {
    this.portalStudies.next(newValue);
  }

  setCreateCategoryToggle(newValue: boolean): void {
    this.createCategoryToggle.next(newValue);
  }


  getCreateCategoryToggle(): Observable<any> {
    return this.createCategoryToggle.asObservable();
  }

  getCreateCategoryToggleClose(): Observable<any> {
    return this.createCategoryToggleClose.asObservable();
  }

  setCreateCategoryToggleClose(newValue: boolean): void {
    this.createCategoryToggleClose.next(newValue);
  }

  search(keyword: string): Observable<any> {
    return this.http.get(this.url + '/api/studySearch/' + keyword)
      .pipe(map((result: any) => {
        return result
      }));
  }

  listingFilter($id: number) {
    return this.http.post(this.url + '/api/studyListingFilter', JSON.stringify({"filterId": $id}), this.httpOptions)
      .pipe(map((result: any) => {
        return result
      }));
  }

  addNotification(result: any) {
    this.alertService.setAlert(result);
  }

  public getQrUrl(studyInfo: any) {
    this.url = studyInfo ? localStorage.getItem('currentUser') + ':4200/qr?link=' + studyInfo.study.id : '';
  }

  redirectToInvite(): Observable<boolean> {
    return this.inviteRedirect.asObservable();
  }

  setRedirectToInvite(val: boolean = false): void {
    this.inviteRedirect.next(val);
  }

  getStudyCategories(studyId: string) {
    return this.http.get(this.url + '/api/categories/' + studyId)
      .pipe(map((result: any) => {
        //this.alertService.setAlert(result);
        return result
      }));
  }

  purgeTestData(studyId: any) {
    return this.http.get(this.url + '/api/resetDemo/' + studyId)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  checkIfLocal() {
    let hostEnv = JSON.parse(localStorage.getItem('currentUser') || '{}')
    var re = hostEnv.envHost;
    var str = "localhost";
    if (re.search(str)) {
      return true;
    } else {
      return false;
    }
  }

  checkStudyUsage() {

    return this.http.get(this.url + '/api/studyUsage')
      .pipe(map((result: any) => {

        return result
      }));
  }

  checkCategoryUsage(studyId: string) {
    return this.http.get(this.url + '/api/categoryUsage/' + studyId)
      .pipe(map((result: any) => {
        return result
      }));
  }

  removeStudy(studyId:string){
    return this.http.delete(this.url + '/api/study/'+ studyId)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  archiveStudy(studyId:string){
    return this.http.get(this.url + '/api/archiveStudy/'+ studyId)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }
  restoreStudy(studyId:string){
    return this.http.get(this.url + '/api/restoreStudy/'+ studyId)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }

  replicateStudy(details:any){
    return this.http.post(this.url + '/api/replicateStudy', details, this.httpOptions)
      .pipe(map((result: any) => {
        this.alertService.setAlert(result);
        return result
      }));
  }


}
