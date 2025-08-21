import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available


      //  const plan = JSON.parse(localStorage.getItem('plan'));


      localStorage.setItem('portId', String(1))
      let currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
     let portalId = JSON.parse(localStorage.getItem('portId') || '{}');

    //console.log(currentUser)
     // currentUser = currentUser ? currentUser : plan;
        if (currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`,
                    Portal: `portal ${portalId}`
                }
            });
        }
      // console.log(request);
        return next.handle(request);
    }
}
