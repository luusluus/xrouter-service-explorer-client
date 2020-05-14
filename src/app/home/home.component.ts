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
  xCloudServices:any;
  spvWallets:any;
  enterpriseXRouterNodeCount:any;

  ngOnInit(): void {
   var sources = [
     this.statsService.GetServiceNodeCount(),
     this.xrouterService.GetNetworkServices(),
     this.xrouterService.GetNetworkSpvWallets(),
     this.statsService.GetEnterpriseXRouterCount()
   ];

   forkJoin(sources).subscribe(data =>{
      this.networkServiceCount = data[0];
      this.xCloudServices = data[1];
      this.spvWallets = data[2];
      this.enterpriseXRouterNodeCount = data[3];
    }, err => {
      if(err.status == 404)
        this.router.navigate(['']);
    });
  }
}
