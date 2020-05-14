import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { isNullOrUndefined } from 'util';
import { ConfigurationService } from '../../../shared/services/configuration.service';
import { MyServiceNode } from '../models/myservicenode.model';


@Injectable()
export class MyServiceNodesService extends BaseService{
  private readonly apiEndpoint = 'MyServicenode';
  private baseEndpoint = '/api/';

  constructor(private http:HttpClient) {
    super();
   }

  // GetServiceNode(id: number){
  //   return this.http.get(this.baseEndpoint + this.apiEndpoint + '/GetServiceNode/?id=' + id);
  // }

  GetServiceNodes(id : string){
    return this.http.get<MyServiceNode[]>(this.baseEndpoint + this.apiEndpoint + '/GetMyServiceNodes/?id=' + id);
  }

  create(servicenode:any){
    return this.http.post<MyServiceNode>(this.baseEndpoint + this.apiEndpoint, servicenode);
  }

  delete(id:number){
    return this.http.delete(this.baseEndpoint + this.apiEndpoint + '/'+ id);
  }

  verifyMessage(address:string, signature:string, message:string){
    return this.http.get<boolean>(this.baseEndpoint + this.apiEndpoint + '/VerifyMessage/?address=' + address + "&signature="+ signature + "&message=" + message);
  }

  isServiceNodeVerified(sNodeKey:string){
    return this.http.get<boolean>(this.baseEndpoint + this.apiEndpoint + '/IsServiceNodeVerified/?sNodeKey=' + sNodeKey);
  }

  update(id: number, servicenode:MyServiceNode){
    return this.http.put<MyServiceNode>(this.baseEndpoint + this.apiEndpoint + '/' + id, servicenode);
  }



}
