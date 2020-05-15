import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../../xrouter/shared/services/xrouter.service';

import { ServiceNodeService } from '../../shared/services/snode.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-service-nodes',
  template: `<app-service-node-list *ngIf="serviceNodes" 
              [serviceNodes]="serviceNodes" 
              [spvWallets]="spvWallets" 
              [xCloudServices]="xCloudServices" 
              [query]="query"
              (query-changed)="onQueryChange($event)"
              >`,
})
export class ServiceNodesComponent implements OnInit {
  private readonly PAGE_SIZE = 10; 

  serviceNodes:any;
  spvWallets:any;
  xCloudServices:any;

  query:any = {
    page: 1,
    pageSize: this.PAGE_SIZE,
  };

  constructor(
    private router: Router, 
    private xrouterService: XrouterService,
    private serviceNodeService: ServiceNodeService
    ) { 
  }

  ngOnInit() {
    var sources = [
      this.xrouterService.GetNetworkServices(),
      this.xrouterService.GetNetworkSpvWallets(),
    ];
  
    forkJoin(sources).subscribe(data =>{
      this.xCloudServices = data[0];
      this.spvWallets = data[1];
    }, err => {
      if(err.status == 404)
        this.router.navigate(['']);
    });
    this.populateServiceNodes();
  }


  private populateServiceNodes(){
    this.serviceNodeService.GetServiceNodeList(this.query)
      .subscribe(servicenodes => {  
        this.serviceNodes = servicenodes;
      });
  }

  //TODO: Make a generic pagination/list component
  onQueryChange(query){
    this.query = query;
    this.populateServiceNodes();
  }
}
