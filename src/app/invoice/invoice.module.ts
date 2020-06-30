import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { QRCodeModule } from 'angularx-qrcode';
import { CountdownModule } from 'ngx-countdown';



import { PaymentFlowModalComponent } from './pages/payment-flow-modal/payment-flow-modal.component';
import { CcSpvService } from './cc-spv.service';
import { SignalRService } from './signal-r.service';

@NgModule({
  declarations: [PaymentFlowModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    ArchwizardModule,
    QRCodeModule,
    CountdownModule 
  ],
  exports:[
    PaymentFlowModalComponent
  ],
  providers:[CcSpvService, SignalRService],
  entryComponents: [PaymentFlowModalComponent]
})
export class InvoiceModule { }
