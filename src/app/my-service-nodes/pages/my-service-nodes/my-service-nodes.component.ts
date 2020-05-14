import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { MyServiceNodesService } from '../../shared/services/myservicenodes.service';
import { isNullOrUndefined } from 'util';
import { MyServiceNode } from '../../shared/models/myservicenode.model';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidateServicenodeModal } from '../validate-service-modal/validate-service-modal.component';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';


@Component({
  selector: 'app-my-service-nodes',
  templateUrl: './my-service-nodes.component.html',
  styleUrls: ['./my-service-nodes.component.css']
})
export class MyServiceNodesComponent implements OnInit {
  @ViewChild('f') serviceNodeForm: NgForm;
  allServiceNodes:any;
  myServiceNodes:MyServiceNode[];
  newServiceNode: MyServiceNode = new MyServiceNode();
  serviceNodePublicAddress:string;
  private applicationUserId:string;
  
  columns:any=[
    {title: 'Servicenode Name'},
    {title: 'Address'},
    {title: 'Ownership'},
    {title: 'Active'},
    {title: 'Remove'},
  ];

  loading:boolean;

  constructor(private router: Router, 
    private route:ActivatedRoute,
    private myServiceNodesService: MyServiceNodesService, 
    private serviceNodeService : ServiceNodeService,
    private modalService: NgbModal
    ) { 
      this.route.params.subscribe(p => {
        this.applicationUserId = p['id'];
        if (isNullOrUndefined(this.applicationUserId)) {
          router.navigate(['']);
          return; 
        }
      });
      this.loading = true;
      this.newServiceNode.applicationUserId = this.applicationUserId;
    }

  ngOnInit() {
    var observableMyServiceNodes: Observable<MyServiceNode[]> = this.myServiceNodesService.GetServiceNodes(this.applicationUserId);
    var observableAllServiceNodes: Observable<any> = this.serviceNodeService.GetServiceNodeList();

    forkJoin([observableMyServiceNodes, observableAllServiceNodes]).subscribe(([mySn, allSn]) =>{
      this.loading = false;
      this.allServiceNodes = allSn;
      this.myServiceNodes = mySn;
    }, err => {
      if(err.status == 404)
        this.router.navigate(['']);
    });
  }

  onSubmit() {
    const servicenode = this.allServiceNodes.items.find(sn => sn.address === this.newServiceNode.address);
    this.newServiceNode.status = servicenode.status;
    this.newServiceNode.sNodeKey = servicenode.sNodeKey;
    this.myServiceNodesService.create(this.newServiceNode)
      .subscribe(serviceNode =>{
        this.myServiceNodes.push(serviceNode);
      }, err => {
        this.router.navigate(['/error'], {queryParams: err});
      });
  }

  onRemove(index:number){
    let id = this.myServiceNodes[index].id;
    if(confirm("Are you sure?")){
      this.myServiceNodesService.delete(id).subscribe(snId => {
        this.myServiceNodes.splice(index, 1);
      }, err => {
        this.router.navigate(['/error'], {queryParams: err});
      });
    }
  }
  
  open(index: number) {
    const modalReference = this.modalService.open(ValidateServicenodeModal, {size: 'lg', windowClass:'wide-modal'});
    modalReference.componentInstance.servicenode = this.myServiceNodes[index];
    modalReference.result.then(res => {
      let myServiceNode = this.myServiceNodes[index];
      const servicenode = this.allServiceNodes.items.find(sn => sn.address === this.newServiceNode.address);
      let updatedServiceNode = new MyServiceNode();      
      updatedServiceNode.address = myServiceNode.address;
      updatedServiceNode.applicationUserId = myServiceNode.applicationUserId;
      updatedServiceNode.id = myServiceNode.id;
      updatedServiceNode.ownership = res;
      updatedServiceNode.status = myServiceNode.status;
      updatedServiceNode.sNodeKey = servicenode.sNodeKey;
      console.log(updatedServiceNode);

      this.myServiceNodesService.update(myServiceNode.id, updatedServiceNode).subscribe(sn =>{
        this.myServiceNodes[index].ownership = sn.ownership;
      });  
    });
  }
}
