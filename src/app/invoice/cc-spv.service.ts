import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CcSpvService extends BaseService{
  private readonly apiEndpoint = environment.ccSpvApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

   GetNewAddress(tokenFullName:string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let url = this.apiEndpoint + tokenFullName.toLowerCase() + '/GetNewAddress';
    return this.http.get(url,{headers, responseType: 'text' as 'json'} );
   }

   GetAddress(tokenFullName:string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let url = this.apiEndpoint + tokenFullName.toLowerCase() + '/GetAddress';
    return this.http.get(url,{headers, responseType: 'text' as 'json'} );
   }

   ListUnspent(tokenFullName:string){
     let url = this.apiEndpoint + tokenFullName.toLowerCase() + '/ListUnspent';
     return this.http.get(url);
   }
}
