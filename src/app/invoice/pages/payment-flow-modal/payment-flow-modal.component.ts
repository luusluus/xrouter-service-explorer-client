import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CcSpvService } from '../../cc-spv.service';

import { finalize } from 'rxjs/operators';
import { SignalRService } from '../../signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
import { Unspent } from '../../models/listunspent.model';
import { WizardComponent } from 'angular-archwizard';
import { MockUtxoServiceService } from '../../mock-utxo-service.service';
import { ConfirmationDialogService } from '../../../ui/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-payment-flow-modal',
  templateUrl: './payment-flow-modal.component.html',
  styleUrls: ['./payment-flow-modal.component.css']
})
export class PaymentFlowModalComponent implements OnInit, OnDestroy {

  @Input() coins: any[];
  @Input() serviceFee:number;
  @Input() serviceName:string;

  @ViewChild('cd', { static: true }) private countdown: CountdownComponent;
  @ViewChild(WizardComponent,  { static: true }) public wizard: WizardComponent;

  private signalRSubscription: Subscription;
  private mockSubscription:Subscription;

  cdConfig = { 
    leftTime: 600, 
    format: 'mm:ss',
    demand: true
  };

  qrdata = 'example';

  selectedCoin:any;

  paymentFee:number;
  amountDue:number;
  address:string;
  
  timeElapsed:boolean = false;
  
  receivedTransactions: Array<Unspent>;
  overPaymentSendBack:boolean = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private signalRService: SignalRService, 
    private http: HttpClient, 
    private ccSpvService:CcSpvService,
    private mockUtxoService:MockUtxoServiceService,
    private confirmationDialogService: ConfirmationDialogService
    ) {}

  ngOnInit() {
    this.timeElapsed = false;
    this.receivedTransactions = [];
    this.overPaymentSendBack = false;
  }

  ngOnDestroy(): void {
    this.signalRService.endConnection();
    if(this.signalRSubscription)
      this.signalRSubscription.unsubscribe();
  }

  private startTransferListUnspent = (coinName:string) => {
    this.http.get(environment.ccSpvApiUrl + 'lw/' + coinName.toLowerCase() + '/TransferListUnspent')
      .subscribe(() => {})
  }

  enterPaymentStep(event:any){
    this.countdown.begin();
    this.receivedTransactions = [];
    this.amountDue = this.paymentFee;

    // this.mockUtxoService.address = this.address;
    // this.mockUtxoService.initMock();
    // this.mockUtxoService.startTimer();
    
    // this.mockSubscription = this.mockUtxoService.getListUnspent().subscribe((listUnspentData:Unspent[]) => {
    //   if(listUnspentData !== undefined){
    //     const unspent = listUnspentData.find(us => us.address === this.address && us.confirmations === 0);
    //       if(unspent != undefined){            
    //         this.amountDue = this.amountDue - unspent.amount;
    //         if( this.amountDue === 0 || this.amountDue < 0){
    //           this.countdown.stop();

    //           if(!this.wizard.isLastStep()){
    //             this.wizard.goToNextStep();
    //           }
    //         }
    //         this.receivedTransactions.push(unspent);
    //       }
    //   }
    //   if(this.areAllUtxosConfirmed()){
    //     this.mockUtxoService.stopTimer();
    //     this.mockSubscription.unsubscribe();

    //     if(this.amountDue < 0){
    //       console.log('sending back...')          
    //       this.ccSpvService.HandleOverPayment(this.selectedCoin.ticker, Math.abs(this.amountDue), this.receivedTransactions.map(rt => rt.txid), this.address)
    //         .subscribe(txhex => {
    //           console.log(txhex);
    //           console.log('sent back');
    //           this.overPaymentSendBack = true;
    //         },
    //         err => {
    //           console.log(err);
    //         })
    //     }
    //   }
    // });
    this.signalRService.startConnection();
    this.signalRService.addTransferListUnspentDataListener();
    this.startTransferListUnspent(this.selectedCoin.ticker);

    this.signalRSubscription = this.signalRService.getListUnspent().subscribe((listUnspentData:Unspent[]) => {
        if(listUnspentData !== undefined){
          const unspent = listUnspentData.find(us => us.address === this.address && us.confirmations === 0);
          if(unspent != undefined){  
            if(!this.receivedTransactions.some(rt => rt.txid === unspent.txid)){
              console.log(unspent)
              this.amountDue = this.amountDue - unspent.amount;
              if( this.amountDue === 0 || this.amountDue < 0){
                this.countdown.stop();
  
                if(!this.wizard.isLastStep()){
                  this.wizard.goToNextStep();
                }
              }
              this.receivedTransactions.push(unspent);
            }
            else if(this.receivedTransactions.some(rt => rt.txid === unspent.txid && rt.confirmations != unspent.amount)){
              console.log(unspent)
              const idx = this.receivedTransactions.findIndex((rt => rt.txid === unspent.txid));
              this.receivedTransactions[idx].confirmations = unspent.confirmations;
            }    
          }
        }
        if(this.areAllUtxosConfirmed()){
          console.log('all confirmed')
          this.signalRService.removeTransferListUnspentDataListener();
          this.signalRService.endConnection();
  
          if(this.amountDue < 0){
            console.log('sending back...')          
            this.ccSpvService.HandleOverPayment(this.selectedCoin.ticker, Math.abs(this.amountDue), this.receivedTransactions.map(rt => rt.txid), this.address)
              .subscribe(txhex => {
                console.log(txhex);
                console.log('sent back');
                this.overPaymentSendBack = true;
              },
              err => {
                console.log(err);
              })
          }
        }
    });
  }

  onSelectCoin(coin:any){
    this.selectedCoin = coin;
    // this.paymentFee = (this.serviceFee / this.selectedCoin.price) * (1 + 0.01);
    this.paymentFee = this.serviceFee;

    this.ccSpvService.GetAddress(this.selectedCoin.ticker).subscribe(addr => {
      this.qrdata = this.selectedCoin.name + ":" + addr;
      this.address = <string> addr;

      this.wizard.goToNextStep();
    });
  }

  onCloseModal(reason:string){
    if(reason === 'cancel'){

      if(this.timeElapsed){
        this.activeModal.close('Canceled');
        return;
      }
      
      if(this.areAllUtxosConfirmed()){
        this.signalRService.removeTransferListUnspentDataListener();
        this.signalRService.endConnection();
        this.activeModal.close('Canceled')
        // this.activeModal.close('Paid');
        return;
      }
      this.confirmationDialogService.confirm('Please Confirm', 'Do you really want to cancel this payment?', 'Yes', 'No', 'sm')
        .then((confirmed) => {
          if(confirmed)
            this.activeModal.dismiss('Canceled payment');
          return;
        })
        .catch(() => {
          //dismiss
          return;
        });
      
      if(this.receivedTransactions.some(rt => rt.confirmations < 2)){
        // Partial payments have been received. Are you sure you want to cancel?
        // If yes, then partial payments will be send back
        // if not return
        return;
      }
    }
    else if(reason === 'paid'){
      this.signalRService.removeTransferListUnspentDataListener();
      this.signalRService.endConnection();
  
      this.activeModal.close('Paid');
    }
  }
  
  areThereUnconfirmedUtxos(){
    if(this.receivedTransactions.length === 0)
      return false;
    return this.receivedTransactions.some(rt => rt.confirmations < 2);
  } 

  areAllUtxosConfirmed(){
    if(this.receivedTransactions.length === 0)
      return false;
    
    return this.receivedTransactions.every(rt => rt.confirmations >= 2);
  }

  handleCountDownEvent(event:any){
    if(event.action === 'done'){
      this.signalRService.removeTransferListUnspentDataListener();
      this.timeElapsed = true;
      this.wizard.goToNextStep();
    }
  }

}
