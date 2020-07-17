import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { EnterpriseServiceRequest } from '../models/enterpriseServiceRequest.model';


@Injectable()
export class EnterpriseXCloudService extends BaseService{

  constructor(private http:HttpClient) {
    super();
   }

  Service(request:EnterpriseServiceRequest){
    const headers = new HttpHeaders();
    
    let body = '[]';
    let url = request.endpoint + '/xrs/' + request.service.replace("xrs::","");
    if(request.params !== undefined)
        body = '["' + request.params.join('","') + '"]';

    if(request.signature && request.rawTxHex){
      headers.set('XR-Signature', request.signature);
      headers.set('XR-Pubkey', request.nodePubKey);
      headers.set('XR-Payment', request.rawTxHex);
    }
    return this.http.post(url, body, {headers: headers});
  }
}
