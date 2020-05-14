import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';


@Injectable()
export class EnterpriseXRouterService extends BaseService{

  constructor(private http:HttpClient) {
    super();
   }

  GetBlockCount(token:string, endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrGetBlockCount';
    return this.http.post(url, '[]');
  }

  GetBlockHash(token:string, blockNumber:string, endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrGetBlockHash';

    return this.http.post(url,'["'+ blockNumber + '"]');
  }

  GetBlock(token:string, blockHash:string, endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrGetBlock';
    return this.http.post(url, '["'+ blockHash + '"]');
  }

  GetBlocks(token:string, blockHashes:string[], endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrGetBlocks';

    return this.http.post(url,'["' + blockHashes.join('","') + '"]');
  }

  GetTransaction(token:string, txid:string, endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrGetTransaction';
    return this.http.post(url, '["' + txid + '"]');
  }

  GetTransactions(token:string, txids:string[], endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrGetTransactions';

    return this.http.post(url,'["' + txids.join('","') + '"]');
  }

  DecodeRawTransaction(token:string, txHex:string, endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") +  '/xrDecodeRawTransaction';
    
    return this.http.post(url,  '["' + txHex + '"]');
  }

  SendTransaction(token:string, signedTx:string, endpoint:string){
    let url = endpoint + '/xr/' + token.replace("xr::","") + '/xrSendTransaction';
    return this.http.post(url,  '["' + signedTx + '"]');
  }
}
