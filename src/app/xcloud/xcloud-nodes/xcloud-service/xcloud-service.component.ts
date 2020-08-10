import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { NgForm } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject, Observable, forkJoin, Subscription } from 'rxjs';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';
import { XCloudService } from '../../shared/services/xcloud.service';
import { EnterpriseXCloudService } from '../../shared/services/enterprise.xcloud.service';
import { ServiceRequest } from '../../shared/models/servicerequest.model';
import { BreadcrumbsService} from '../../../ui/breadcrumb/breadcrumbs.service';
import { CcSpvService } from '../../../invoice/cc-spv.service';
import { EnterpriseServiceRequest } from '../../shared/models/enterpriseServiceRequest.model';

@Component({
  selector: 'app-xcloud-service',
  template:
        `<div *ngIf="!serviceInfo">
          Loading...
        </div> 
        <div *ngIf="serviceInfo">
          <app-xcloud-service-details 
            [serviceName]="serviceName"
            [nodePubKey]="nodePubKey"
            [serviceInfo]="serviceInfo"
            [serviceCallResult]="serviceCallResult"
            [coins]="availableCoins"
            (onXCloudSubmit)="onXCloudSubmit($event)">
  `
})
export class XCloudServiceComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription:Subscription;
  serviceName:string;
  nodePubKey:string;
  serviceInfo:any;
  serviceCallResult: any;
  availableCoins:any[] = ['BLOCK'];
  breadcrumbs: any[];

  constructor(
    private xcloudService:XCloudService,
    private enterpriseXCloudService:EnterpriseXCloudService,
    private router:Router,
    private route:ActivatedRoute, 
    private serviceNodeService: ServiceNodeService,
    private ccSpvService: CcSpvService,
    private breadcrumbsService:BreadcrumbsService
    ) 
    { 
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.params.subscribe(p => {
        this.serviceName = p['name'];
        if (isNullOrUndefined(this.serviceName)) {
          router.navigate(['']);
          return; 
        }
      });

      this.navigationSubscription = this.router.events.subscribe((e:any) => {
        if(e instanceof NavigationEnd){
          this.initializeData();
        }
      });

      this.breadcrumbsService.get().subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
    }

  private initializeData(){
    // var observableIsServiceNodeVerified: Observable<boolean> = this.myServiceNodesService.isServiceNodeVerified(this.nodePubKey);
    var observableServiceNodeInfo: Observable<any> = this.serviceNodeService.GetServiceInfo(this.serviceName);
    // var observableAvailableCoins: Observable<any> = this.ccSpvService.GetAvailableCoins();
    

    forkJoin(
      [
        observableServiceNodeInfo,
        // observableAvailableCoins
      ])
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((
          [
            serviceInfo,
            coins
          ]
          ) =>{
      this.serviceInfo = serviceInfo;
      // this.availableCoins = coins;     
      this.nodePubKey = this.serviceInfo.node.nodePubKey; 
    }, err => {
      console.log(err)
      this.router.navigate(['/error'], {queryParams: err});
    });
  }
  ngOnInit() {
    this.breadcrumbsService.store([
      this.breadcrumbs[0], 
      this.breadcrumbs[1], 
      {
        label: this.serviceName, 
        url:this.breadcrumbs[1].url + '/nodes/' + this.serviceName, 
        params:[]
      }, 
      this.breadcrumbs[2]]
    );    
  }

  onXCloudSubmit(xCloudInput:any) { 
    const parameterValues = xCloudInput.parameterValues;
    const enterprise = xCloudInput.callEXRDirectly;
    console.log(xCloudInput)

    if(enterprise){
      let serviceRequest = new EnterpriseServiceRequest();
      serviceRequest.endpoint = 'http://' + this.serviceInfo.node.host + ':' + this.serviceInfo.node.port;
      serviceRequest.params = parameterValues;
      serviceRequest.service = this.serviceName;

      if(this.serviceInfo.service.fee > 0){
        serviceRequest.nodePubKey = this.nodePubKey;
        serviceRequest.signature = xCloudInput.signature;
        serviceRequest.rawTxHex = xCloudInput.rawTxHex;
      }

      console.log(serviceRequest);

      this.xcloudService.ServiceEnterprise(serviceRequest)
      .pipe(
        finalize(() => {
      }))  
      .subscribe(result => {
        console.log(result)
        this.serviceCallResult = {...result};
      },
      error => {
        console.log(error)
        this.serviceCallResult = this.serviceCallResult = {...error};
      });    
    }
    else{
      let serviceRequest = new ServiceRequest();
      serviceRequest.service = this.serviceName;
      serviceRequest.parameters = parameterValues;
      serviceRequest.nodecount = 1;
      this.xcloudService.Service(serviceRequest)
      .pipe(
        finalize(() => {
      }))  
      .subscribe(result => {
          this.serviceCallResult = result;
        },
        error => {
          this.serviceCallResult = error;
        });    
    }
  }

  ngOnDestroy(){
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }

}




