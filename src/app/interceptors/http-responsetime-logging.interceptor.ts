import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError, ReplaySubject } from 'rxjs';
   import { retry, catchError, map, tap } from 'rxjs/operators';
   import { Router } from '@angular/router';
   import { Injectable } from '@angular/core';
   import { ResponseTimeService } from '../shared/services/responsetime.service';
   
   @Injectable({
    providedIn: 'root'
  })
   export class HttpRequestTimeInterceptor implements HttpInterceptor {
    constructor(private responseTimeService: ResponseTimeService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      var startTime = (new Date()).getTime();
      return next.handle(req).pipe(
        map(
          (event) => {
            if (event instanceof HttpResponse) {
              var endTime = (new Date()).getTime();
              event = event.clone({ headers: event.headers.set('endTime', endTime.toString()) });
              event = event.clone({ headers: event.headers.set('startTime', startTime.toString()) });
              var diff = endTime - startTime;
  
              console.log(event.url + " succeeded in " + diff + " milli seconds");
              
            }
            return event;
          }), tap(event => { },
            error => {
              if (error instanceof HttpErrorResponse) {
                var endTime = (new Date()).getTime();
                var diff = endTime - startTime;
                
                console.log(error.url + " failed in " + diff + " milli seconds");
              }
            }
          )
      );
    }
  }