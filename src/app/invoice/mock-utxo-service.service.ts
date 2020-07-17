import { Injectable, OnInit } from '@angular/core';
import { Unspent } from './models/listunspent.model';
import { interval, of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockUtxoServiceService {

  address: string;
  amount: number;
  listUnspent: Unspent[] = [];

  setInterval;

  txId:number;
  txIds:string[] = [];

  txIdCounter:number = 0;

  interval: any;

  private subject = new Subject<Unspent[]>();

  constructor() { 
    
  }

  initMock(){
    this.txId = 0;
    this.amount = 15;
    this.txIdCounter = 0;
    this.txIds = ['0043c63fe37a2a2f404a125bd9bf60d287fcea8ce7b7baf99de9de241241ee53',
    '3e51859be06b75d0960a44f51523570dfc7407cce846508168c7af4f91054120',
    '9c493b3edc02932016b12c1cea294146eaf09b15158e29eb0df62c93fcbae3e5'
    ];
    this.listUnspent = [];
  }


  getListUnspent(){
    return this.subject.asObservable();
  }

  setAddress(address:string){
    this.address = address;
  }


  startTimer(){
    this.interval = setInterval(() => {
      this.updateConfirmations();
      if(this.listUnspent.length < this.txIds.length)
        this.updateListUnspent();
        
      this.subject.next(this.listUnspent);
    }, 10000);
  }

  stopTimer(){
    clearInterval(this.interval);
  }

  private updateListUnspent(){
    const decrease = 6;
    this.amount = this.amount - decrease;

    const unspent:Unspent = {
      address : this.address, 
      amount : decrease,
      confirmations : 0,
      spendable : false,
      txid : this.txIds[this.txIdCounter],
      vout : 0
    }
    this.txIdCounter++;
    this.listUnspent.push(unspent);
  }

  private updateConfirmations(){
    this.listUnspent.forEach(lu => lu.confirmations += 1);
  }
}
