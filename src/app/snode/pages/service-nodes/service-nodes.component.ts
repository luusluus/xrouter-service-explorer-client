import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../../xrouter/shared/services/xrouter.service';

import { ServiceNodeService } from '../../shared/services/snode.service';
import { LoadingService } from '../../../ui/spinner/shared/services/loading.service';

@Component({
  selector: 'app-service-nodes',
  template: `
            <div *ngIf="!(serviceNodes && xCloudServices && spvWallets)">
              Loading...
            </div> 
            <div *ngIf="serviceNodes && xCloudServices && spvWallets">
              <app-service-node-list
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
    private serviceNodeService: ServiceNodeService,
    ) { 
  }

  ngOnInit() {
    this.xrouterService.GetNetworkServices().subscribe(svc =>{
      this.xCloudServices = svc["reply"]["services"]
      this.spvWallets = svc["reply"]["spvWallets"]
    }, err => {
      console.log(err)
      this.router.navigate(['/error'], {queryParams: err});
    });
    this.populateServiceNodes();
  }


  private populateServiceNodes(){
    this.serviceNodeService.GetServiceNodeList(this.query)
      .subscribe(servicenodes => {  
        this.serviceNodes = servicenodes;
      }, err => {
        console.log(err)
        this.router.navigate(['/error'], {queryParams: err});
      });
  }

  //TODO: Make a generic pagination/list component
  onQueryChange(query){
    this.query = query;
    this.populateServiceNodes();
  }
}
