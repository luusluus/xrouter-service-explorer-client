import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';


@Injectable({ 
  providedIn: 'root'
})
export class XCloudService extends BaseService{
  private readonly apiEndpoint = environment.xrsApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

  Service(request:any){
    let url = this.apiEndpoint + '/Service';
    return this.http.post<any>(url, request);
  }
}
