import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { XrouterService } from '../../../xrouter/shared/services/xrouter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin, Observable } from 'rxjs';
import { ServiceNodeService } from '../../shared/services/snode.service';

@Component({
  selector: 'app-service-node',
  templateUrl: './service-node.component.html',
  styleUrls: ['./service-node.component.css']
})
export class ServiceNodeComponent implements OnInit, OnDestroy {
  private readonly PAGE_SIZE = 6; 

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  loading:boolean;

  nodePubKey:string;
  service:string;
  xCloudServices:any;
  serviceNodeInfo:any;
  snodeVerified:boolean;

  query:any = {
    page: 1,
    pageSize: this.PAGE_SIZE,
  };

  constructor(
    private router:Router,
    private route:ActivatedRoute, 
    private serviceNodeService: ServiceNodeService
  ) 
  { 
    this.route.params.subscribe(p => {
      this.nodePubKey = p['nodePubKey'];
      this.service = p['service'];
      if (isNullOrUndefined(this.nodePubKey)) {
        router.navigate(['']);
        return; 
      }
      this.loading = true;
    });
  }

  ngOnInit() {
    // var observableIsServiceNodeVerified: Observable<boolean> = this.myServiceNodesService.isServiceNodeVerified(this.nodePubKey);
    var observableServiceNodeInfo: Observable<any> = this.serviceNodeService.GetNodeInfo(this.nodePubKey, this.service);

    forkJoin([ observableServiceNodeInfo]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([ nodeInfo]) =>{
      this.loading = false;
      this.snodeVerified = true;
      this.serviceNodeInfo = nodeInfo;
    }, err => {
      if(err.status == 404)
      this.router.navigate(['/error'], {queryParams: err});
    });
  }

  ngOnDestroy() {
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }

  private populateXCloudServices(){
    this.serviceNodeService.FilterXCloudServiceServiceNode(this.query)
      .subscribe(result => {        
        this.xCloudServices = result;
      });
  }

  ngOnChanges(){
    this.initializeQuery();
	}

  onFilterChange() {
    this.query.page = 1; 
    this.populateXCloudServices();
  }

  private initializeQuery(){}

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.populateXCloudServices();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateXCloudServices();
  }

}