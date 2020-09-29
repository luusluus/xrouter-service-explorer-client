import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node-list',
  template: `
        <h2>Service nodes supporting {{ service }}</h2>
        <h4>
          <span class="badge badge-secondary" *ngIf="nodes.length == 1; else manyNodes">{{ nodes.length}} Servicenode</span>
          <ng-template #manyNodes><span class="badge badge-secondary">{{ nodes.length}} Servicenodes</span></ng-template>
        </h4>
        <table class="table table-striped">
            <thead>
              <tr>
                <th *ngFor="let c of columns"> 
                  {{ c.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let n of nodes">
                <td class="snode"><a [routerLink]="[n.nodePubKey]">{{n.nodePubKey}}</a></td>
                <td>{{n.host}}</td>
                <td>{{n.type}}</td>
                <td>{{n.score}}</td>
                <td>{{n.feeDefault}}</td>
              </tr>
            </tbody>
          </table>
  `,
  styles:[`td.snode{ 
            max-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
          }`
        ]
})
export class NodeListComponent implements OnInit {

  constructor() { }

  @Input('service') service:string;
  @Input('nodes') nodes:any = {};

  columns:any=[
    {title: 'Snode Key', key: 'snodekey'},
    {title: 'Host', key: 'host'},
    {title: 'Type', key: 'type'},
    {title: 'Score', key: 'score'},
    {title: 'Default Fee', key: 'defaultfee' }
  ];

  ngOnInit() {
    console.log(this.nodes)
  }

}
