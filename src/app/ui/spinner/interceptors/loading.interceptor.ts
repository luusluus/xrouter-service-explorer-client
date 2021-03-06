import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalRequests++;
        this.loadingService.setLoading(true);

        return next.handle(req).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {
                    this.loadingService.setLoading(false);
                }
            })
    );
  }
}