import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';
import { SpvWalletInfo} from '../models/spvWalletInfo.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceNodeService extends BaseService{
  private readonly apiEndpoint = environment.snodeApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

  GetNodesByService(service:string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetNodesByService/?service=' + service;
    url += '&node_count=' + node_count;
    return this.http.get(url);
  }

  GetServiceInfo(service: string, nodePubKey?: string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetServiceInfo/?service=' + service;
    if(!isNullOrUndefined(nodePubKey)){
      url += '&nodePubKey=' + nodePubKey;
    }
    url += '&node_count=' + node_count;
    return this.http.get(url);
  }

  GetSpvWalletInfo(service: string, nodePubKey?: string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetSpvWalletInfo/?service=' + service;
    if(!isNullOrUndefined(nodePubKey)){
      url += '&nodePubKey=' + nodePubKey;
    }
    url += '&node_count=' + node_count;
    return this.http.get<SpvWalletInfo>(url);
  }

  GetNodeInfo(nodePubKey:string, service?:string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetNodeInfo/?nodePubKey=' + nodePubKey;
    if(!isNullOrUndefined(service)){
      url += '&service=' + service;
    }
    url += '&node_count=' + node_count;
    return this.http.get(url);
  }

  FilterXCloudServiceServiceNode(filter){
    let url = this.apiEndpoint + '/FilterXCloudServiceServiceNode' + '?' + this.toQueryString(filter);
    return this.http.get<any>(url);
  }

  GetServiceNodeList(filter?){
    let url = this.apiEndpoint + '/GetServiceNodeList' + '?' + this.toQueryString(filter);
    return this.http.get<any>(url);
  }

  private toQueryString(obj) {  
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
