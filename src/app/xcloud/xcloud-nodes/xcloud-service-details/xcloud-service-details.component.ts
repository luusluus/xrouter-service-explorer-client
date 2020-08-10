import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { sha256 } from 'js-sha256';

import { PaymentFlowModalComponent } from '../../../invoice/pages/payment-flow-modal/payment-flow-modal.component';
import { CcSpvService } from '../../../invoice/cc-spv.service';
import { ServiceInfoResult } from '../../shared/models/serviceInfoResult.model';

@Component({
  selector: 'app-xcloud-service-details',
  templateUrl: './xcloud-service-details.component.html',
  styleUrls: ['./xcloud-service-details.component.css']
})
export class XCloudServiceDetailsComponent implements OnInit, OnChanges {
  @Input() serviceName:string;
  @Input() nodePubKey:string;
  @Input() serviceInfo:ServiceInfoResult;
  @Input() serviceCallResult:any;  
  @Input() coins:any;
  @Output() onXCloudSubmit = new EventEmitter();

  executing: boolean;
  callEXRDirectly: boolean = false;
  shortServiceName: string;
  description:string;
  servicePayType: string;

  test:string;

  constructor(private modalService: NgbModal, private ccSpvService: CcSpvService ) {}
  
  @ViewChild('serviceForm', { static: true }) serviceForm: NgForm;
  parametervalues:string[];

  ngOnInit() {
    if(this.serviceInfo.service.parametersList){
      if(this.serviceInfo.service.parametersList.length > 0)
        this.parametervalues = new Array<string>(this.serviceInfo.service.parametersList.length);
    }

    if(this.serviceInfo.node.type == 'Enterprise'){
      this.callEXRDirectly = true;
    }

    this.shortServiceName = this.serviceName.replace("xrs::", "");
    if(this.serviceInfo.service.fee > 0){
      this.servicePayType = 'Purchase service';
    }
    else
      this.servicePayType = 'Try it out';

    if(this.serviceInfo.service.description.includes('\\n')){
      this.serviceInfo.service.description = this.replaceAll(this.serviceInfo.service.description, '\\n', '\n');
    }

    if(this.serviceInfo.service.help.includes('\\n')){
      this.serviceInfo.service.help = this.replaceAll(this.serviceInfo.service.help, '\\n', '\n');
    }
  }
  
  ngOnChanges(){
    this.executing = false;
  }

  onSubmit() {
    if(this.serviceInfo.service.fee === 0){
      this.executing = true;
      this.onXCloudSubmit.emit(
        {
          parameterValues:this.parametervalues,
          callEXRDirectly:this.callEXRDirectly
        }
      );
    }
    else{
      // this.openModal();
    }
    
  }

  openModal(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    const modalReference = this.modalService.open(PaymentFlowModalComponent, ngbModalOptions);
    modalReference.componentInstance.coins = this.coins;
    modalReference.componentInstance.serviceFee = this.serviceInfo.service.fee;
    modalReference.componentInstance.serviceName = this.serviceName;

    modalReference.result.then(res => {
      // closure of modal
      if(res === 'Paid'){
        const body = '["' + this.parametervalues.join('","') + '"]';
        const hashedBody = sha256(sha256(body));
  
        this.ccSpvService.HandleEnterpriseXRouterPayment(this.serviceInfo.service.fee, hashedBody, this.serviceInfo.node.paymentAddress)
          .subscribe(res => {
            console.log(res)
            this.onXCloudSubmit.emit(
              {
                parameterValues:this.parametervalues,
                callEXRDirectly:this.callEXRDirectly,
                signature: res.signature,
                rawTxHex: res.txHex
              });
          }, err => {
            console.log(err)
          });
      }
    }).catch(err => {
      // dismissal of modal
      console.log(err);
    });
  }

  //TODO: Put in a Utils module?
  private escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  private replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

}
