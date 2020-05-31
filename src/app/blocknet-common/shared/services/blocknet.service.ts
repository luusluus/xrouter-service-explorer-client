import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlocknetService extends BaseService{
  private readonly apiEndpoint = environment.blocknetWalletApiUrl;

  constructor(private http:HttpClient) {
    super();
  }

  getNetworkInfo(){
    let url = this.apiEndpoint + '/getNetworkInfo';
    return this.http.get(url);
  }
}
