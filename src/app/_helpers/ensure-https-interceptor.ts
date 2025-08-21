import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpClient} from '@angular/common/http';
import {Location} from "@angular/common";

@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {

  constructor(private loc: Location) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service
    // clone request and replace 'http://' with 'https://' at the same time
    const angularRoute = this.loc.path();
    const url = window.location.href;
    let text = url.replace(angularRoute, '');

    if (text.search("localhost") >= 1) {
      const secureReq = req.clone({
        url: req.url.replace('https://', 'http://')
      });
      return next.handle(secureReq);
    } else {
      if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
      }
      const secureReq = req.clone({
        url: req.url.replace('http://', 'https://')
      });
      return next.handle(secureReq);
    }
// send the cloned, "secure" request to the next handler.
  }
}
