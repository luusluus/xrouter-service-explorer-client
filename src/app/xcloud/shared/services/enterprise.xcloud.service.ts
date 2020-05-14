import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';


@Injectable()
export class EnterpriseXCloudService extends BaseService{

  constructor(private http:HttpClient) {
    super();
   }

  Service(name:string, params:string[], endpoint:string){
    let body = '[]';
    if(params !== undefined)
      body = '["' + params.join('","') + '"]';

    let url = endpoint + '/xrs/' + name.replace("xrs::","");
    return this.http.post(url, body);
  }
}
