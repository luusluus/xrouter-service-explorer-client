import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class StatisticsService extends BaseService{
  private readonly apiEndpoint = environment.statisticsApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

  GetServiceNodeCount(){
    return this.http.get<number>(this.apiEndpoint + '/GetServiceNodeCount');
  }

  GetEnterpriseXRouterCount(){
    return this.http.get<number>(this.apiEndpoint + '/GetEnterpriseXRouterServiceNodeCount');
  }
}
