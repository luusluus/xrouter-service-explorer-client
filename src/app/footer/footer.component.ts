import { Component, OnInit } from '@angular/core';
import { BlocknetService } from '../blocknet-common/shared/services/blocknet.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  networkInfo:any;
  
  constructor(private blocknetService: BlocknetService) {}
  ngOnInit(){
    this.blocknetService.getNetworkInfo().subscribe(networkInfo =>  {
      this.networkInfo = networkInfo
    });
  }


}
