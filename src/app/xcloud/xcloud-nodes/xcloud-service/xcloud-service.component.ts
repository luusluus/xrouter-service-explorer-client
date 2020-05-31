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
            [serviceResult]="serviceResult"
            (onXCloudSubmit)="onXCloudSubmit($event)">
  `
})
export class XCloudServiceComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription:Subscription;
  serviceName:string;
  nodePubKey:string;
  serviceInfo:any;
  serviceResult: any;
  breadcrumbs: any[];


  constructor(
    private xcloudService:XCloudService,
    private enterpriseXCloudService:EnterpriseXCloudService,
    private router:Router,
    private route:ActivatedRoute, 
    private serviceNodeService: ServiceNodeService,
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

    forkJoin([observableServiceNodeInfo]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([serviceInfo]) =>{
      this.serviceInfo = serviceInfo;
      this.nodePubKey = this.serviceInfo.node.nodePubKey;
    }, err => {
      // if(err.status == 404)
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
    if(enterprise)
      this.enterpriseXCloudService.Service(this.serviceName, parameterValues, 'http://' + this.serviceInfo.node.host + ':' + this.serviceInfo.node.port)
      .pipe(
        finalize(() => {
      }))  
      .subscribe(result => {
          this.serviceResult = {...result};
        },
        error => {
          this.serviceResult = this.serviceResult = {...error};
        });    
    else
      this.xcloudService.Service(new ServiceRequest(this.serviceName, parameterValues, 1))
      .pipe(
        finalize(() => {
      }))  
      .subscribe(result => {
          this.serviceResult = result;
        },
        error => {
          this.serviceResult = error;
        });    
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




