import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { NgForm } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject, Observable, forkJoin } from 'rxjs';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';
import { XCloudService } from '../../shared/services/xcloud.service';
import { EnterpriseXCloudService } from '../../shared/services/enterprise.xcloud.service';
import { ServiceRequest } from '../../shared/models/servicerequest.model';

@Component({
  selector: 'app-xcloud-service',
  templateUrl: './xcloud-service.component.html',
  styleUrls: ['./xcloud-service.component.css']
})
export class XCloudServiceComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription;
  loading:boolean = true;
  serviceName:string;
  nodePubKey:string;
  result:any;
  snodeVerified:boolean;
  parametervalues:string[];
  active = 1;

  @ViewChild('serviceForm') serviceForm: NgForm;
  serviceResult:any;
  resultLoading:boolean;

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
      this.snodeVerified = true;
      this.result = serviceInfo;
      this.location.replaceState("/xcloud-services/" + this.serviceName + "/" + this.result.node.nodePubKey);
      if(this.result.service.parametersList){
        if(this.result.service.parametersList.length > 0)
          this.parametervalues = new Array<string>(this.result.service.parametersList.length);
      }

      this.loading = false;
      this.resultLoading = false;

    }, err => {
      if(err.status == 404)
      this.router.navigate(['/error'], {queryParams: err});
    });
  }
  ngOnInit() {}

  onSubmit() {  
    this.resultLoading = true; 
    if(this.result.node.type === "Enterprise")
      this.enterpriseXCloudService.Service(this.serviceName, this.parametervalues, 'http://' + this.result.node.host + ':' + this.result.node.port)
      .pipe(
        finalize(() => {
          this.resultLoading = false;
      }))  
      .subscribe(result => {
          this.serviceResult = JSON.stringify(result, undefined, 2);
        },
        error => {
          this.serviceResult = JSON.stringify(error, undefined, 2);
        });    
    else
      this.xcloudService.Service(new ServiceRequest(this.serviceName, this.parametervalues, 1))
      .pipe(
        finalize(() => {
          this.resultLoading = false;
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




