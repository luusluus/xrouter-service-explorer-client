import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-xcloud-service-details',
  templateUrl: './xcloud-service-details.component.html',
  styleUrls: ['./xcloud-service-details.component.css']
})
export class XCloudServiceDetailsComponent implements OnInit, OnChanges {
  @Input() serviceName:string;
  @Input() nodePubKey:string;
  @Input() serviceInfo:any;
  @Output() onXCloudSubmit = new EventEmitter();

  executing: boolean;

  constructor() { }

  
  @ViewChild('serviceForm') serviceForm: NgForm;
  parametervalues:string[];
  serviceResult:any;

  ngOnInit() {
    if(this.serviceInfo.service.parametersList){
      if(this.serviceInfo.service.parametersList.length > 0)
        this.parametervalues = new Array<string>(this.serviceInfo.service.parametersList.length);
    }
  }
  
  ngOnChanges(){
    this.executing = false;
  }

  onSubmit() {
    this.executing = true;
    this.onXCloudSubmit.emit(
      {
        parameterValues:this.parametervalues
      }
    );
  }

}
