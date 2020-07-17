import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { QRCodeModule } from 'angularx-qrcode';
import { CountdownModule } from 'ngx-countdown';

import { PaymentFlowModalComponent } from './pages/payment-flow-modal/payment-flow-modal.component';
import { CcSpvService } from './cc-spv.service';
import { SignalRService } from './signal-r.service';
import { MockUtxoServiceService } from './mock-utxo-service.service';
import { ConfirmationDialogModule } from '../ui/confirmation-dialog/confirmation-dialog.module';
import { ConfirmationDialogComponent } from '../ui/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [PaymentFlowModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    ArchwizardModule,
    QRCodeModule,
    CountdownModule,
    ConfirmationDialogModule
  ],
  exports:[
    PaymentFlowModalComponent
  ],
  providers:[CcSpvService, SignalRService, MockUtxoServiceService],
  entryComponents: [PaymentFlowModalComponent, ConfirmationDialogComponent]
})
export class InvoiceModule { }
