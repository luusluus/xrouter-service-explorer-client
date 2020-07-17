import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './confirmation-dialog.service';


@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  providers:[
    ConfirmationDialogService
  ]
})
export class ConfirmationDialogModule { }
