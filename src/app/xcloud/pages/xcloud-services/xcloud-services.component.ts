import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../../xrouter/shared/services/xrouter.service';

@Component({
  selector: 'app-xcloud-services',
  templateUrl: './xcloud-services.component.html',
  styleUrls: ['./xcloud-services.component.css']
})
export class XCloudServicesComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  services = {};

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
    this.populateServices();
  }

  private populateServices(){
    this.xrouterService.GetNetworkServices()
      .subscribe(result => {
        this.services = result;
        this.loading = false;
      });
  }

  onQueryChange(query){
    this.query = query;
    this.populateServices();
  }
}
