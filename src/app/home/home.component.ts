import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { StatisticsService } from '../statistics/shared/services/stats.service';
import { XrouterService } from '../xrouter/shared/services/xrouter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router, 
    private xrouterService: XrouterService,
    private statsService: StatisticsService
    )
    {}
  networkServiceCount:any;
  xCloudServiceCount:any;
  spvWalletCount:any;
  enterpriseXRouterNodeCount:any;

  ngOnInit(): void {
   var sources = [
     this.statsService.GetServiceNodeCount(),
     this.xrouterService.GetNetworkServices(),
    //  this.statsService.GetEnterpriseXRouterCount()
   ];

   forkJoin(sources).subscribe(data =>{
      this.networkServiceCount = data[0];
      this.xCloudServiceCount = data[1]["services"].length
      this.spvWalletCount = data[1]["spvWallets"].length
      
    }, err => {
      if(err.status == 404)
        this.router.navigate(['']);
    });
  }
}
