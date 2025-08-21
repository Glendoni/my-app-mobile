import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  public resultList: BehaviorSubject<[]>;
  public categoryList: BehaviorSubject<[]>;
  public storeFilterSelectionArrSelection: BehaviorSubject<[]>;
  public storeFilterSelection: BehaviorSubject<[]>;
  //public locallyStoredFilterSelection: BehaviorSubject<[]>;
  public filtercat: BehaviorSubject<[]>;
  public filterdates: BehaviorSubject<[]>;
  public showComments: BehaviorSubject<boolean>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public url
  public  studyId: string = "9aad164a-d12d-4100-ac31-d38d3e5461da"
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
   this.url = this.authenticationService.url;
    this.resultList = new BehaviorSubject<[]>([]);
    this.categoryList = new BehaviorSubject<[]>([]);
    this.storeFilterSelection = new BehaviorSubject<[]>([]);
   // this.locallyStoredFilterSelection = new BehaviorSubject<[]>([]);
    this.storeFilterSelectionArrSelection = new BehaviorSubject<[]>([]);
    this.filtercat = new BehaviorSubject<[]>([]);
    this.filterdates = new BehaviorSubject<[]>([]);
    this.showComments = new BehaviorSubject<boolean>(false);
  }
  getQuestionReport(study_id:string){
    return this.http.get(this.url + '/api/studyReport/'+ study_id);
  }


  getQuestionReportFilter(study_id:string, filter:any, filterDates:any){
    return this.http.post(this.url + '/api/studyReportFilter/'+study_id, JSON.stringify(
      {filter: filter, study_id:study_id, filterDates: filterDates }), this.httpOptions);
  }
  getStudyMatrix(study_id:string){
    return this.http.get(this.url + '/api/studyMatrix/'+ study_id);
  }

  setResultList(newValue: any): void {
    this.resultList.next(newValue);
  }

  getResultList(): Observable<any> {
    return this.resultList.asObservable();
  }

  setCategoryList(newValue: any): void {
    this.categoryList.next(newValue);
  }

  getCategoryList(): Observable<any> {
    return this.categoryList.asObservable();
  }

  setStoreFilterSelectionArrSelection(newValue: any): void {
    this.storeFilterSelectionArrSelection.next(newValue);
  }

  getStoreFilterSelectionArrSelection(): Observable<any> {
    return this.storeFilterSelectionArrSelection.asObservable();
  }

  setStoreFilterSelection(newValue: any): void {
    this.storeFilterSelection.next(newValue);
  }

  getStoreFilterSelection(): Observable<any> {
    return this.storeFilterSelection.asObservable();
  }

  setFiltercat(newValue: any): void {
    this.filtercat.next(newValue);
  }

  getFiltercat(): Observable<any> {
    return this.filtercat.asObservable();
  }

  setFilterDates(newValue: any): void {
    this.filterdates.next(newValue);
  }

  getFilterDates(): Observable<any> {
    return this.filterdates.asObservable();
  }

  setLocallyStoredFilterSelection(newValue: any): void {

  }

  getLocallyStoredFilterSelection(): Observable<any> {
    return this.storeFilterSelection.asObservable();
  }

  setShowComment(newValue: any): void {
    this.showComments.next(newValue);
  }

  getShowComment(): Observable<any> {
    return this.showComments.asObservable();
  }

}
