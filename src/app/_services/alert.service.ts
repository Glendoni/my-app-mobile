import {Injectable} from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AlertService {

  public notification = new Subject<string>();

  setAlert(notice: any): void {
   // console.log(notice)
     this.notification.next(notice);
  }

  getAlert(): Observable<string> {
    return this.notification.asObservable();
  }


}
