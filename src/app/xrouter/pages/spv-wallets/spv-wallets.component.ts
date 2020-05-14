import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../shared/services/xrouter.service';

@Component({
  selector: 'app-spv-wallets',
  templateUrl: './spv-wallets.component.html',
  styleUrls: ['./spv-wallets.component.css']
})
export class SpvWalletsComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  spvWallets = {};

  query:any = {
    pageSize: this.PAGE_SIZE,
  };
  queryPastCourses:any = {
    pageSize: this.PAGE_SIZE,
  }; 
  loading: boolean;

  constructor(private router: Router, private xrouterService: XrouterService) { 
    this.loading = true;
  }

  ngOnInit() {
    this.populateSpvWallets();
  }

  private populateSpvWallets(){
    this.xrouterService.GetNetworkSpvWallets()
      .subscribe(result => {
        this.spvWallets = result;
        this.loading = false;
      });
  }

  onQueryChange(query){
    this.query = query;
    this.populateSpvWallets();
  }

}
