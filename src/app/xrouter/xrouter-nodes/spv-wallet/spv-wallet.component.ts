import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { XrouterService } from '../../shared/services/xrouter.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { finalize, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { EnterpriseXRouterService } from '../../shared/services/enterprise.xrouter.service';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';
import { SpvWalletInfo } from '../../../snode/shared/models/spvWalletInfo.model';
import { LoadingService } from '../../../ui/spinner/shared/services/loading.service';
import { BreadcrumbsService} from '../../../ui/breadcrumb/breadcrumbs.service';
@Component({
  selector: 'app-spv-wallet',
  template:`
                <div *ngIf="!spvWalletInfo">
                  Loading...
                </div> 
                <div *ngIf="spvWalletInfo">
                  <app-spv-wallet-details *ngIf="spvWalletInfo"
                    [spvWalletInfo]="spvWalletInfo"
                    [spvWalletName]="spvWalletName"
                    [nodePubKey]="nodePubKey"
                    [spvWalletCommandResult]="spvWalletCommandResult"
                    (onSPVSubmit)="onSPVSubmit($event)">
            `
})
export class SpvWalletComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription:Subscription;
  
  spvWalletInfo:SpvWalletInfo;

  spvWalletName: string;
  nodePubKey: string;
  resultLoading: boolean;
  spvWalletCommandResult: any;

  breadcrumbs:any[];

  constructor(
    private xrouterApiService:XrouterService,
    private enterpriseXrouterApiService:EnterpriseXRouterService,
    private router:Router,
    private route:ActivatedRoute,
    private serviceNodeService : ServiceNodeService,
    private breadcrumbsService:BreadcrumbsService
    ) 
    { 
      this.route.params.subscribe(p => {
        this.spvWalletName = p['name'];
        this.nodePubKey = p['breadcrumb'];
        if (isNullOrUndefined(this.spvWalletName)) {
          router.navigate(['']);
          return; 
        }
      });

      this.navigationSubscription = this.router.events.subscribe((e:any) => {
        if(e instanceof NavigationEnd){
          this.initializeData();
        }
      });

      this.breadcrumbsService.get().subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
    }

  private initializeData(){
    this.serviceNodeService.GetSpvWalletInfo(this.spvWalletName, this.nodePubKey).subscribe(spvWalletInfo =>{
      this.spvWalletInfo = spvWalletInfo;
    }, err => {
      this.router.navigate(['/error'], {queryParams: err});
    });
  }

  ngOnInit() {
    this.breadcrumbsService.store([
      this.breadcrumbs[0], 
      this.breadcrumbs[1], 
      {
        label: this.spvWalletName, 
        url:this.breadcrumbs[1].url + '/nodes/' + this.spvWalletName, 
        params:[]
      }, 
      this.breadcrumbs[2]]
    );
  }

  private callXrouterCommand(callback:Observable<object>){
    callback.pipe(
          finalize(() => {
        }))
        .subscribe(result => {
          this.spvWalletCommandResult = result;
        },
        error => {
          this.spvWalletCommandResult = error;
        });
  }

  onSPVSubmit(spvParameters:any){
    const form = spvParameters.form as NgForm;
    const nodecount = spvParameters.nodeCount;
    const enterpriseXRouterEndpoint = 'http://' + this.spvWalletInfo.node.host + ':' + this.spvWalletInfo.node.port;
    const enterprise = spvParameters.callEXRDirectly;
    switch(form.value.selectedSpvCommand){
      case "xrGetBlockCount":{  
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlockCount(this.spvWalletName, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlockCount(this.spvWalletName, nodecount));
        break;    
      }
      case "xrGetBlockHash":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlockHash(this.spvWalletName, form.value.blockNumber, enterpriseXRouterEndpoint));
        else 
          this.callXrouterCommand(this.xrouterApiService.GetBlockHash(this.spvWalletName, form.value.blockNumber, nodecount));        
        break;
      }
      case "xrGetBlock":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlock(this.spvWalletName, form.value.blockHash, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlock(this.spvWalletName, form.value.blockHash, nodecount));
        break;
      }
      case "xrGetBlocks":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlocks(this.spvWalletName, spvParameters.blockHashes, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlocks(this.spvWalletName, spvParameters.blockHashes, nodecount));
        break;
      }
      case "xrGetTransaction":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetTransaction(this.spvWalletName, form.value.txid, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetTransaction(this.spvWalletName, form.value.txid, nodecount));
        break;
      }
      case "xrGetTransactions":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetTransactions(this.spvWalletName, spvParameters.txIds, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetTransactions(this.spvWalletName, spvParameters.txIds, nodecount));
        break;
      }
      case "xrDecodeRawTransaction":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.DecodeRawTransaction(this.spvWalletName, form.value.txHex, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.DecodeRawTransaction(this.spvWalletName, form.value.txHex, nodecount))        
        break;
      }
      case "xrSendTransaction":{
        if(enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.SendTransaction(this.spvWalletName, form.value.signedTx, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.SendTransaction(this.spvWalletName, form.value.signedTx, nodecount));
        break;
      }
    }
  }

  ngOnDestroy(){
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }


}


