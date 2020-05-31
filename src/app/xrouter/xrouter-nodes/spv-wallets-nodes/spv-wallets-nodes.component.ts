import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { XrouterService } from '../../shared/services/xrouter.service';
import { LoadingService } from '../../../ui/spinner/shared/services/loading.service';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';

@Component({
  selector: 'app-spv-wallets-nodes',
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
export class SpvWalletsNodesComponent implements OnInit {

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
