import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'service-list',
  template: `
        <h2>{{ nameList }}</h2>
        <h4><span class="badge badge-secondary ml-1">{{ (services | keyvalue).length}} {{ nameList }}</span></h4>
        <table class="table table-striped">
            <thead>
              <tr>
                <th *ngFor="let c of columns">
                    <div *ngIf="c.isSortable" (click)="sortBy(c.key)">
                        {{ c.title }}
                        <i *ngIf="query.sortBy === c.key" 
                          class="fa"
                          [class.fa-sort-asc]="query.isSortAscending"
                          [class.fa-sort-desc]="!query.isSortAscending"
                        ></i>
                      </div>
                      <div *ngIf="!c.isSortable">
                        {{ c.title }}
                      </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of services | keyvalue:keepOriginalOrder">
                <td><a [routerLink]="['nodes', c.key]">{{c.key}}</a></td>
                <td>{{c.value}}</td>
              </tr>
            </tbody>
          </table>
  `
})

export class ServiceListComponent implements OnInit {

  private readonly PAGE_SIZE = 3; 

  public keepOriginalOrder = (a, b) => a.key

  @Input('services') services:any = {};

  @Input('query-init') queryInit = {};

  @Input('name-list') nameList:string;

  @Output('query-changed') queryChanged = new EventEmitter();

  query: any = {
    pageSize: this.PAGE_SIZE
  };
  
  columns:any=[
    {title: 'Name', key: 'name'},
    {title: 'Node Count', key: 'nodeCount', isSortable: true},
    {}
  ];
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeQuery();
  }

  ngOnChanges(){
    this.initializeQuery();
	}

  onFilterChange() {
    this.query.page = 1; 
    this.queryChanged.emit(this.query);
  }

  private initializeQuery(){
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.queryChanged.emit(this.query);
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending; 
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.queryChanged.emit(this.query);
  }

  onPageChange(page) {
    this.query.page = page;
    this.queryChanged.emit(this.query);
  }

}
