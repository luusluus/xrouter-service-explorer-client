import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { XrouterService } from '../../shared/services/xrouter.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { finalize, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { EnterpriseXRouterService } from '../../shared/services/enterprise.xrouter.service';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';
import { SpvWalletInfo } from '../../shared/models/spvWalletInfo.model';

@Component({
  selector: 'app-spv-wallet',
  template:`<app-spv-wallet-details *ngIf="spvWalletInfo"
              [spvWalletInfo]="spvWalletInfo"
              [spvWalletName]="spvWalletName"
              [nodePubKey]="nodePubKey"
              [spvWalletCommandResult]="spvWalletCommandResult"
              (onSPVSubmit)="onSPVSubmit($event)"
            >`
})
export class SpvWalletComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription:Subscription;
  
  spvWalletInfo:SpvWalletInfo;

  enterprise:boolean = false;

  spvWalletName: string;
  nodePubKey: string;
  resultLoading: boolean;
  spvWalletCommandResult: string;

  constructor(
    private xrouterApiService:XrouterService,
    private enterpriseXrouterApiService:EnterpriseXRouterService,
    private router:Router,
    private route:ActivatedRoute, 
    private location:Location,
    private serviceNodeService : ServiceNodeService
    ) 
    { 
      this.route.params.subscribe(p => {
        this.spvWalletName = p['name'];
        this.nodePubKey = p['nodePubKey'];
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
    }

  private initializeData(){
    // var observableIsServiceNodeVerified: Observable<boolean> = this.myServiceNodesService.isServiceNodeVerified(this.nodePubKey);
    var observableServiceNodeInfo: Observable<any> = this.serviceNodeService.GetSpvWalletInfo(this.spvWalletName, this.nodePubKey);

    forkJoin([observableServiceNodeInfo]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([ spvWalletInfo]) =>{
      this.spvWalletInfo = spvWalletInfo;
      this.location.replaceState("/spv-wallets/" + this.spvWalletName + "/" + this.spvWalletInfo.node.nodePubKey);

    }, err => {
      // if(err.status == 404)
        this.router.navigate(['/error'], {queryParams: err});
    });
  }

  ngOnInit() {}

  private callXrouterCommand(callback:Observable<object>){
    callback.pipe(
          finalize(() => {
        }))
        .subscribe(result => {
          this.spvWalletCommandResult = JSON.stringify(result, undefined, 2);
        },
        error => {
          console.log(error)
          this.spvWalletCommandResult = JSON.stringify(error, undefined, 2);
        });
  }

  onSPVSubmit(spvParameters:any){
    const form = spvParameters.form as NgForm;
    const nodecount = spvParameters.nodeCount;
    const enterpriseXRouterEndpoint = 'http://' + this.spvWalletInfo.node.host + ':' + this.spvWalletInfo.node.port;
    switch(form.value.selectedSpvCommand){
      case "xrGetBlockCount":{  
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlockCount(this.spvWalletName, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlockCount(this.spvWalletName, nodecount));
        break;    
      }
      case "xrGetBlockHash":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlockHash(this.spvWalletName, form.value.blockNumber, enterpriseXRouterEndpoint));
        else 
          this.callXrouterCommand(this.xrouterApiService.GetBlockHash(this.spvWalletName, form.value.blockNumber, nodecount));        
        break;
      }
      case "xrGetBlock":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlock(this.spvWalletName, form.value.blockHash, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlock(this.spvWalletName, form.value.blockHash, nodecount));
        break;
      }
      case "xrGetBlocks":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlocks(this.spvWalletName, spvParameters.blockHashes, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlocks(this.spvWalletName, spvParameters.blockHashes, nodecount));
        break;
      }
      case "xrGetTransaction":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetTransaction(this.spvWalletName, form.value.txid, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetTransaction(this.spvWalletName, form.value.txid, nodecount));
        break;
      }
      case "xrGetTransactions":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetTransactions(this.spvWalletName, spvParameters.txIds, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.GetTransactions(this.spvWalletName, spvParameters.txIds, nodecount));
        break;
      }
      case "xrDecodeRawTransaction":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.DecodeRawTransaction(this.spvWalletName, form.value.txHex, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.DecodeRawTransaction(this.spvWalletName, form.value.txHex, nodecount))        
        break;
      }
      case "xrSendTransaction":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.SendTransaction(this.spvWalletName, form.value.signedTx, enterpriseXRouterEndpoint));
        else
          this.callXrouterCommand(this.xrouterApiService.SendTransaction({blockchain: this.spvWalletName, signedTx: form.value.signedTx, nodeCount: nodecount}));
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


