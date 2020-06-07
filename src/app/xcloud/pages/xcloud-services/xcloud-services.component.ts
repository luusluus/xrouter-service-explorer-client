import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../../xrouter/shared/services/xrouter.service';
import { LoadingService } from '../../../ui/spinner/shared/services/loading.service';

@Component({
  selector: 'app-xcloud-services',
  template:`
              <div *ngIf="!services">
                Loading...
              </div> 
              <div *ngIf="services">
                <service-list 
                      [name-list]="nameList"
                        [services]="services" 
                        [query-init]="query"
                        (query-changed)="onQueryChange($event)">
                </service-list>
              </div>`
})
export class XCloudServicesComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  services:any;

  nameList:string = "XCloud Services";

  query:any = {
    pageSize: this.PAGE_SIZE,
  };

  constructor(
    private router: Router,
    private xrouterService: XrouterService) { 
    
  }

  ngOnInit() {
    this.populateServices();
  }

  private populateServices(){
    this.xrouterService.GetNetworkServices()
      .subscribe(svc => {
        let nc = svc["reply"]["nodeCounts"]
        
        this.services = Object.keys(nc)
          .filter(key => key.includes('xrs::'))
          .reduce( (res, key) => (res[key] = nc[key], res), {} );
      }, err => {
        console.log(err)
        this.router.navigate(['/error'], {queryParams: err});
      });
  }

  onQueryChange(query){
    this.query = query;
    this.populateServices();
  }
}
