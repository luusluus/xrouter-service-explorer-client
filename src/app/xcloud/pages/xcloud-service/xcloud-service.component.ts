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

@Component({
  selector: 'app-xcloud-service',
  template:
  `
    <app-xcloud-service-details *ngIf="serviceInfo"
      [serviceName]="serviceName"
      [nodePubKey]="nodePubKey"
      [serviceInfo]="serviceInfo"
      (onXCloudSubmit)="onXCloudSubmit($event)"
    >
  `
})
export class XCloudServiceComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription:Subscription;
  serviceName:string;
  nodePubKey:string;
  serviceInfo:any;
  serviceResult: string;


  constructor(
    private xcloudService:XCloudService,
    private enterpriseXCloudService:EnterpriseXCloudService,
    private router:Router,
    private route:ActivatedRoute, 
    private location:Location,
    private serviceNodeService: ServiceNodeService
    ) 
    { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.params.subscribe(p => {
        this.serviceName = p['name'];
        this.nodePubKey = p['nodePubKey'];
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
    }

  private initializeData(){
    // var observableIsServiceNodeVerified: Observable<boolean> = this.myServiceNodesService.isServiceNodeVerified(this.nodePubKey);
    var observableServiceNodeInfo: Observable<any> = this.serviceNodeService.GetServiceInfo(this.serviceName);

    forkJoin([observableServiceNodeInfo]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([serviceInfo]) =>{
      this.serviceInfo = serviceInfo;
      this.location.replaceState("/xcloud-services/" + this.serviceName + "/" + this.serviceInfo.node.nodePubKey);
    }, err => {
      // if(err.status == 404)
      this.router.navigate(['/error'], {queryParams: err});
    });
  }
  ngOnInit() {}

  onXCloudSubmit(xCloudInput:any) { 
    const parametervalues = xCloudInput.parametervalues
    if(this.serviceInfo.node.type === "Enterprise")
      this.enterpriseXCloudService.Service(this.serviceName, parametervalues, 'http://' + this.serviceInfo.node.host + ':' + this.serviceInfo.node.port)
      .pipe(
        finalize(() => {
      }))  
      .subscribe(result => {
          this.serviceResult = JSON.stringify(result, undefined, 2);
        },
        error => {
          this.serviceResult = JSON.stringify(error, undefined, 2);
        });    
    else
      this.xcloudService.Service(new ServiceRequest(this.serviceName, parametervalues, 1))
      .pipe(
        finalize(() => {
      }))  
      .subscribe(result => {
          this.serviceResult = JSON.stringify(result, undefined, 2);
        },
        error => {
          this.serviceResult = JSON.stringify(error, undefined, 2);
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




