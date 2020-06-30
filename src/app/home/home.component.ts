import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { XrouterService } from '../xrouter/shared/services/xrouter.service';
import { ServiceNodeService } from '../snode/shared/services/snode.service';
import { SignalRService } from '../invoice/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  constructor(
    private router: Router, 
    private xrouterService: XrouterService,
    private servicenodeService: ServiceNodeService,
    )
    {}
  networkServiceCount:any;
  xCloudServiceCount:any;
  spvWalletCount:any;
  enterpriseXRouterNodeCount:any;

  ngOnInit(): void {
   var sources = [
     this.servicenodeService.GetServiceNodeCount(),
     this.xrouterService.GetNetworkServices()
   ];

   forkJoin(sources).subscribe(data =>{
      this.networkServiceCount = data[0];
      this.xCloudServiceCount = data[1]["reply"]["services"].length
      this.spvWalletCount = data[1]["reply"]["spvWallets"].length
      
    }, err => {
        console.log(err)
        this.router.navigate(['/error'], {queryParams: err});
    });
  }
}
