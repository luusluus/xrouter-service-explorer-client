import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class XrouterService extends BaseService{
  private readonly apiEndpoint = environment.xrApiUrl;

  constructor(private http:HttpClient) {
    super();
   }

  search(queryString: string) {
    let _URL = this.apiEndpoint + "/?searchString=" + queryString;
    return this.http.get(_URL);
  }

  // getAllServices(){
  //   return this.http.get(this.apiEndpoint + '/getAllServices');
  // }

  GetNetworkServices(){
    return this.http.get(this.apiEndpoint + '/getNetworkServices');
  }

  // GetNetworkSpvWallets(){
  //   return this.http.get(this.apiEndpoint + '/getNetworkSpvWallets');
  // }

  GetBlockCount(token:string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetBlockCount';
    return this.http.post(url, {token: token, nodeCount: node_count});
  }

  GetBlockHash(token:string, blockNumber:string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetBlockHash';

    return this.http.post(url, {token: token, blockNumber: blockNumber, nodeCount: node_count});
  }

  GetBlock(token:string, blockHash:string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetBlock';
    return this.http.post(url, {token: token, blockHash: blockHash, nodeCount: node_count});
  }

  GetBlocks(token:string, blockHashes:string[], node_count:number = 1){
    let url = this.apiEndpoint + '/GetBlocks';

    return this.http.post(url, {token: token, blockHashes: blockHashes, nodeCount: node_count});
  }

  GetTransaction(token:string, txid:string, node_count:number = 1){
    let url = this.apiEndpoint + '/GetTransaction';
    return this.http.post(url, {token: token, txid: txid, nodeCount: node_count});
  }

  GetTransactions(token:string, txids:string[], node_count:number = 1){
    let url = this.apiEndpoint + '/GetTransactions';
    return this.http.post(url, {token: token, txIds:txids, nodeCount: node_count});
  }

  DecodeRawTransaction(token:string, txHex:string, node_count:number = 1){
    let url = this.apiEndpoint + '/DecodeRawTransaction';
    return this.http.post(url, {token: token, txHex: txHex, nodeCount: node_count});
  }

  SendTransaction(token:string, signedTx:string, node_count:number = 1){
    let url = this.apiEndpoint + '/SendTransaction';
    return this.http.post(url, {token: token, signedTx: signedTx, nodeCount: node_count});
  }
}
