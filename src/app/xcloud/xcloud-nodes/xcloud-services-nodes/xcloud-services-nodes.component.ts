import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';

@Component({
  selector: 'app-xcloud-services-nodes',
  template:`
              <div *ngIf="!nodes">
                Loading...
              </div> 
              <div *ngIf="nodes">
                <app-node-list
                  [nodes]="nodes"
                  [service]="service"
                >
                </app-node-list>
              </div>`
})
export class XcloudServicesNodesComponent implements OnInit {
  service:string;
  nodes:any;

  constructor(
    private route:ActivatedRoute, 
    private serviceNodeService: ServiceNodeService
    ) { 
      this.route.params.subscribe(p => {
        this.service = p["breadcrumb"];
      });
  }

  ngOnInit() {
    this.populateNodes();
  }

  private populateNodes(){
    this.serviceNodeService.GetNodesByService(this.service)
      .subscribe(nodes => {        
        this.nodes = nodes;
      });
  }

}
