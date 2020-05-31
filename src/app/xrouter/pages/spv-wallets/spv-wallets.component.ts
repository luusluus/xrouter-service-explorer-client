import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../shared/services/xrouter.service';
import { LoadingService } from '../../../ui/spinner/shared/services/loading.service';

@Component({
  selector: 'app-spv-wallets',
  template:`
              <div *ngIf="!spvWallets">
                Loading...
              </div> 
              <div *ngIf="spvWallets">
                <service-list                
                  [name-list]="nameList"
                  [services]="spvWallets" 
                  [query-init]="query"
                  (query-changed)="onQueryChange($event)">
                </service-list>
              </div>`
})
export class SpvWalletsComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  spvWallets:any;

  nameList:string = "Spv Wallets";

  constructor(
    private loadingService: LoadingService,
    private xrouterService: XrouterService
    ) { 
  }

  ngOnInit() {
    this.populateSpvWallets();
  }

  private populateSpvWallets(){
    this.xrouterService.GetNetworkServices()
      .subscribe(svc => {        
        let nc = svc["nodeCounts"]
        
        this.spvWallets = Object.keys(nc)
          .filter(key => key.includes('xr::'))
          .reduce( (res, key) => (res[key] = nc[key], res), {} );        
      });
  }
}
