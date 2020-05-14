import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicenodeAddressValidatorDirective } from './directives/snode-address-validator';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { MyServiceNodesComponent } from './pages/my-service-nodes/my-service-nodes.component';
import { ValidateServicenodeModal } from './pages/validate-service-modal/validate-service-modal.component';
import { MyServiceNodeListComponent } from './components/my-service-node-list/my-service-node-list.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatStepperModule, 
    MatInputModule, 
    MatButtonModule, 
    MatAutocompleteModule
  ],
  declarations: [
    MyServiceNodesComponent,
    MyServiceNodeListComponent,
    ValidateServicenodeModal, 
    ServicenodeAddressValidatorDirective
  ],
  exports: [MyServiceNodesComponent],
  bootstrap: [MyServiceNodesComponent],
  entryComponents: [ValidateServicenodeModal]
})
export class MyServiceNodesModule {}
