import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';
import { EnterpriseServiceRequest } from '../models/enterpriseServiceRequest.model';


@Injectable({ 
  providedIn: 'root'
})
export class XCloudService extends BaseService{
  private readonly apiEndpoint = environment.xrsApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

  Service(request:any){
    const url = this.apiEndpoint + '/Service';
    return this.http.post<any>(url, request);
  }

  ServiceEnterprise(request:EnterpriseServiceRequest){
    const url = this.apiEndpoint + '/ServiceEnterprise';
    return this.http.post<any>(url, request);
  }
}
