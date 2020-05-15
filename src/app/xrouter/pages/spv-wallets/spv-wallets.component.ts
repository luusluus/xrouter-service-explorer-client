import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../shared/services/xrouter.service';

@Component({
  selector: 'app-spv-wallets',
  template:`<service-list *ngIf="spvWallets"
              [name-list]="nameList"
              [services]="spvWallets" 
              [query-init]="query"
              (query-changed)="onQueryChange($event)">
            </service-list>`
})
export class SpvWalletsComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  spvWallets:any;

  nameList:string = "Spv Wallets";

  constructor(private router: Router, private xrouterService: XrouterService) { 
  }

  ngOnInit() {
    this.populateSpvWallets();
  }

  private populateSpvWallets(){
    this.xrouterService.GetNetworkSpvWallets()
      .subscribe(result => {
        this.spvWallets = result;
      });
  }
}
