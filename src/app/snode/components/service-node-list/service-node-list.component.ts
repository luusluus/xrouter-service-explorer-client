import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { LoadingService } from '../../../ui/spinner/shared/services/loading.service';

@Component({
  selector: 'app-service-node-list',
  templateUrl: './service-node-list.component.html',
  styleUrls: ['./service-node-list.component.css']
})
export class ServiceNodeListComponent implements OnInit, OnChanges, AfterViewInit {
  private readonly PAGE_SIZE = 10;

  @Input() serviceNodes:any;
  @Input() spvWallets:any;
  @Input() xCloudServices:any;
  @Input() query:any;
  @Output('query-changed') queryChanged = new EventEmitter();

  @ViewChild('searchSNode', { static: true }) searchSNode;

  columns:any=[
    {title: 'SNode Key', key: 'snodeKey'},
    {title: 'Host', key: 'host'},
    {title: 'Type', key: 'type'},
    // {title: 'Status', key: 'status'},
    {title: 'Spv Wallets', key: 'spvWallets'},
    {title: 'XCloud Services', key: 'xCloudServices'},
  ];

  selectedSpvWallets:string[];
  selectedXCloudServices:string[];

  constructor(
    private router: Router,
    public loadingService: LoadingService
    ) { }

  ngOnChanges(changes:SimpleChanges) {
    this.selectedSpvWallets = new Array<string>(this.serviceNodes.items.length);     
    this.selectedXCloudServices = new Array<string>(this.serviceNodes.items.length);
    this.initializeSpvWalletDropdowns(this.serviceNodes)
    this.initializeXCloudServicesDropdowns(this.serviceNodes)
  }

  ngOnInit() {
    console.log(this.serviceNodes)
    this.selectedSpvWallets = new Array<string>(this.serviceNodes.items.length);     
    this.selectedXCloudServices = new Array<string>(this.serviceNodes.items.length);
    this.initializeSpvWalletDropdowns(this.serviceNodes)
    this.initializeXCloudServicesDropdowns(this.serviceNodes)
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

  onSpvWalletClick(i){
    this.router.navigate(['/spv-wallets/nodes', this.selectedSpvWallets[i], this.serviceNodes.items[i].sNodeKey]);
  }

  onXCloudServiceClick(i){
    this.router.navigate(['/xcloud-services/nodes', this.selectedXCloudServices[i], this.serviceNodes.items[i].sNodeKey]);
  }

  private initializeQuery(){

  }

  onFilterChange() {
    this.query.page = 1; 
    this.queryChanged.emit(this.query);
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.searchSNode.nativeElement.value = ""
    this.queryChanged.emit(this.query)
  }

  onPageChange(page) {
    this.query.page = page;
    // this.querying = true;
    this.queryChanged.emit(this.query)
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
}
