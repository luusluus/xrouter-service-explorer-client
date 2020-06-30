import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CcSpvService } from '../../cc-spv.service';

import { finalize } from 'rxjs/operators';
import { SignalRService } from '../../signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
import { ListUnspent } from '../../models/listunspent.model';
import { WizardComponent } from 'angular-archwizard';

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

  cdConfig = { leftTime: 600, format: 'mm:ss' };

  paymentFee:number;
  qrdata = 'example';
  address:string;
  paymentReceived:boolean = false;

  timeElapsed:boolean = false;
  
  confirmations:number;
  selectedCoin:any;
  
  constructor(public activeModal: NgbActiveModal, private signalRService: SignalRService, private http: HttpClient, private ccSpvService:CcSpvService ) {}

  ngOnInit() {
    this.paymentReceived = false;
    this.timeElapsed = false;
  }

  ngOnDestroy(): void {
    this.signalRService.endConnection();
    this.signalRSubscription.unsubscribe();
  }

  private startHttpRequest = (coinName:string) => {
    this.http.get(environment.ccSpvApiUrl + coinName.toLowerCase() + '/listunspent')
      .subscribe(res => {
        console.log(res);
      })
  }

  enterLastStep(event:any){
    this.countdown.begin();

    this.signalRService.startConnection();
    this.signalRService.addTransferListUnspentDataListener();
    this.startHttpRequest(this.selectedCoin.name);

    this.signalRSubscription = this.signalRService.getListUnspent().subscribe(
      (listUnspentData : ListUnspent[]) => {
        const unspent = listUnspentData.find(us => us.address === this.address);
        if(unspent != undefined){
          this.paymentReceived = true;
          console.log('payment received');
          console.log('confirmations: ' + unspent.confirmations )
          this.confirmations = unspent.confirmations;
          if(unspent.amount === this.paymentFee){
            this.countdown.stop();
            this.wizard.goToNextStep();
          }
        }
    });
  }

  onSelectCoin(coin:any){
    this.selectedCoin = coin;
    this.paymentFee = (this.serviceFee / this.selectedCoin.price) * (1 + 0.01);

    this.ccSpvService.GetNewAddress(this.selectedCoin.name).subscribe(addr => {
      this.qrdata = this.selectedCoin.name + ":" + addr;
      this.address = <string> addr;
      this.wizard.goToNextStep();
    });
  }

  onCloseModal(){
    if(this.paymentReceived && this.confirmations < 2) 
      return;

    this.signalRService.removeTransferListUnspentDataListener();

    if(this.paymentReceived && this.confirmations >= 2)
      this.activeModal.close('Paid');
    else
      this.activeModal.close('Closed');
  }
  
  handleCountDownEvent(event:any){
    if(event.action === 'done'){
      this.signalRService.removeTransferListUnspentDataListener();
      this.timeElapsed = true;
      this.wizard.goToNextStep();
    }
  }

}
