import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Unspent } from './models/listunspent.model';

@Injectable({
  providedIn: 'root'
})
export class CcSpvService extends BaseService{
  private readonly apiEndpoint = environment.ccSpvApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

   GetNewAddress(coin:string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = this.apiEndpoint + coin.toLowerCase() + '/GetNewAddress';
    return this.http.get(url,{headers, responseType: 'text' as 'json'} );
   }

   GetAddress(coin:string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = this.apiEndpoint + 'lw/' + coin.toLowerCase() + '/GetAddress';
    return this.http.get(url,{headers, responseType: 'text' as 'json'} );
   }

   ListUnspent(coin:string){
     const url = this.apiEndpoint + 'lw/' + coin.toLowerCase() + '/ListUnspent';
     return this.http.get<Unspent[]>(url);
   }

   GetAvailableCoins(){
     const url = this.apiEndpoint + 'ccdata/GetAvailableCoins';
     return this.http.get<any>(url);
   }

   SendTransaction(coin:string){
     const url = this.apiEndpoint + 'lw/'+ coin.toLowerCase() + 'SendTransaction';
     return this.http.post(url, {});
   }

   SignMessage(coin:string, address:string, message:string ){
    const url = this.apiEndpoint + 'lw/'+ coin.toLowerCase() + 'SignMessage';
    return this.http.post<string>(url, {
      message:message,
      address:address
    });
   }

   HandleEnterpriseXRouterPayment(serviceFee:number, hash:string, paymentAddress:string){
     const url = this.apiEndpoint + 'lw/' + 'block/' + 'HandleEnterpriseXRouterPayment';
     return this.http.post<any>(url, {
      hash: hash,
      serviceFee: serviceFee,
      paymentAddress: paymentAddress,
     });
   }

   HandleOverPayment(coin:string, amount:number, txIds:string[], changeAddress:string){
    const url = this.apiEndpoint + 'lw/' + coin + '/HandleOverPayment';
    return this.http.post<any>(url, {
      amount: amount,
      txIds: txIds,
      changeAddress: changeAddress
     });
   }
}
