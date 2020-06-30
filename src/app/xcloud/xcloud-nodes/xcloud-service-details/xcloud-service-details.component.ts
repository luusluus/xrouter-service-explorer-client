import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFlowModalComponent } from '../../../invoice/pages/payment-flow-modal/payment-flow-modal.component';
import { XCloudService } from '../../shared/services/xcloud.service';
import { ServiceRequest } from '../../../xcloud/shared/models/servicerequest.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-xcloud-service-details',
  templateUrl: './xcloud-service-details.component.html',
  styleUrls: ['./xcloud-service-details.component.css']
})
export class XCloudServiceDetailsComponent implements OnInit, OnChanges {
  @Input() serviceName:string;
  @Input() nodePubKey:string;
  @Input() serviceInfo:any;
  @Input() serviceResult:any;
  @Input() coins:any[];
  @Output() onXCloudSubmit = new EventEmitter();

  

  executing: boolean;
  callEXRDirectly: boolean = false;
  shortServiceName: string;
  description:string;
  servicePayType: string;

  constructor(private modalService: NgbModal, private xCloudService: XCloudService ) {
  }

  
  @ViewChild('serviceForm', { static: true }) serviceForm: NgForm;
  parametervalues:string[];

  ngOnInit() {
    if(this.serviceInfo.service.parametersList){
      if(this.serviceInfo.service.parametersList.length > 0)
        this.parametervalues = new Array<string>(this.serviceInfo.service.parametersList.length);
    }

    if(this.serviceInfo.node.type == 'Enterprise'){
      // this.callEXRDirectly = true;
    }

    this.shortServiceName = this.serviceName.replace("xrs::", "");
    if(this.serviceInfo.service.fee > 0)
      this.servicePayType = 'Purchase service';
    else
      this.servicePayType = 'Try it out';
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
      this.openModal();
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
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  }

}
