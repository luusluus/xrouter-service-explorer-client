import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { XrouterService } from '../../../xrouter/shared/services/xrouter.service';
import { fromEvent, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { ServiceNodeService } from '../../shared/services/snode.service';

@Component({
  selector: 'app-service-nodes',
  templateUrl: './service-nodes.component.html',
  styleUrls: ['./service-nodes.component.css']
})
export class ServiceNodesComponent implements OnInit, AfterViewInit {
  private readonly PAGE_SIZE = 10; 

  @ViewChild('searchSNode') searchSNode;
  serviceNodes:any;
  spvWallets:any;
  xCloudServices:any;

  selectedSpvWallets:string[];
  selectedXCloudServices:string[];

  query:any = {
    page: 1,
    pageSize: this.PAGE_SIZE,
  };

  columns:any=[
    {title: 'SNode Key', key: 'snodeKey'},
    {title: 'Address', key: 'address'},
    {title: 'Type', key: 'type'},
    {title: 'Status', key: 'status'},
    {title: 'Spv Wallets', key: 'spvWallets'},
    {title: 'XCloud Services', key: 'xCloudServices'},
  ];

  loading:boolean;
  querying:boolean;

  constructor(
    private router: Router, 
    private xrouterService: XrouterService,
    private serviceNodeService: ServiceNodeService
    ) { 
    this.loading = true;
    this.querying = true;
  }

  ngOnInit() {
    var sources = [
      this.xrouterService.GetNetworkServices(),
      this.xrouterService.GetNetworkSpvWallets(),
    ];
  
    forkJoin(sources).subscribe(data =>{
      this.xCloudServices = data[0];
      this.spvWallets = data[1];
    }, err => {
      if(err.status == 404)
        this.router.navigate(['']);
    });
    this.populateServiceNodes();
  }

  ngAfterViewInit() {
    fromEvent(this.searchSNode.nativeElement,'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(150),
          distinctUntilChanged(),
          tap((text) => {
            this.query.search = this.searchSNode.nativeElement.value
            this.onFilterChange()
          })
      )
      .subscribe();
  }

  private populateServiceNodes(){
    this.querying = true;
    this.serviceNodeService.GetServiceNodeList(this.query)
      .subscribe(result => {  
        this.selectedSpvWallets = new Array<string>(result.items.length);     
        this.selectedXCloudServices = new Array<string>(result.items.length);
        this.initializeSpvWalletDropdowns(result)
        this.initializeXCloudServicesDropdowns(result)
        this.serviceNodes = result;
        this.loading = false;
        this.querying = false;
      });
  }

  private initializeSpvWalletDropdowns(data:any){
    for (var index in data.items) {
      let list = data.items[index].spvWallets
      if(list.length > 0){
        this.selectedSpvWallets[index] = list[0]
      }
    }    
  }

  private initializeXCloudServicesDropdowns(data:any){
    for (var index in data.items) {
      let list = data.items[index].xCloudServices
      if(list.length > 0){
        this.selectedXCloudServices[index] = list[0]
      }
    }    
  }

  ngOnChanges(){
    this.initializeQuery();
  }
  
  onSpvWalletClick(i){
    this.router.navigate(['/spv-wallets', this.selectedSpvWallets[i], this.serviceNodes.items[i].sNodeKey]);
  }

  onXCloudServiceClick(i){
    this.router.navigate(['/xcloud-services', this.selectedXCloudServices[i], this.serviceNodes.items[i].sNodeKey]);
  }

  onFilterChange() {
    this.query.page = 1; 
    this.populateServiceNodes();
  }

  private initializeQuery(){}

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.searchSNode.nativeElement.value= ""
    this.populateServiceNodes();
  }

  onPageChange(page) {
    this.query.page = page;
    this.querying = true;
    this.populateServiceNodes();
  }
}
