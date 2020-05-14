import { Component, OnInit, Input } from '@angular/core';
import { MyServiceNode } from '../../shared/models/myservicenode.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MyServiceNodesService } from '../../shared/services/myservicenodes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'validate-servicenode-modal',
  templateUrl: './validate-service-modal.component.html',
})
export class ValidateServicenodeModal implements OnInit {
  @Input() servicenode:MyServiceNode;
  isLinear = false;
  formGroup: FormGroup;

  toBeSignedMessage:string
  signatureMessage:string;
  closeResult: string;
  submitted:boolean = false;
  signatureValidated:boolean;
  resultMessage:string;

  constructor(public activeModal: NgbActiveModal, 
    private myServiceNodesService: MyServiceNodesService, 
    private router:Router,
    private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.toBeSignedMessage = "service-explorer-verification-" + this.servicenode.id;
    this.formGroup = this._formBuilder.group({
      signature: ['', [Validators.required, Validators.minLength(88), Validators.maxLength(88)]]
    });
  }

  onVerifySubmit(){
    if(this.formGroup.invalid) return;

    let address = this.servicenode.address;
    this.myServiceNodesService.verifyMessage(address, encodeURIComponent(this.formGroup.get('signature').value), this.toBeSignedMessage).subscribe(res => {
      this.submitted = true;
      if(res){
        this.activeModal.close(res);
      } else{
        this.signatureValidated = res;
        this.resultMessage = "Service node not verified!";
      }
    },
    err =>{
      this.submitted = true;
      this.signatureValidated = false;
      this.resultMessage = err.message;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

}
