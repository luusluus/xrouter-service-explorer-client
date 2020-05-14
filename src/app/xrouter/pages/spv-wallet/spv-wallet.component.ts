import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { XrouterService } from '../../shared/services/xrouter.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { finalize, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, Subject } from 'rxjs';
import { EnterpriseXRouterService } from '../../shared/services/enterprise.xrouter.service';
import { ServiceNodeService } from '../../../snode/shared/services/snode.service';

@Component({
  selector: 'app-spv-wallet',
  templateUrl: './spv-wallet.component.html',
  styleUrls: ['./spv-wallet.component.css']
})
export class SpvWalletComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  navigationSubscription;
  loading:boolean;
  spvWalletName:string;
  shortSpvWalletName:string;
  nodePubKey:string;
  nodeCount:number;
  minNodeCount:number = 1;
  result:any;
  snodeVerified:boolean;
  enterprise:boolean = false;
  
  active = 1;
  selectedSpvCommand:string;
  onCommandSelectedSubject: Subject<any> = new Subject<any>();

  @ViewChild('f') f: NgForm;
  blockHashes:string[] = [""];
  txIds:string[] = [""];
  
  resultLoading:boolean;
  spvWalletCommandResult:any;
  responseTime:number;

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
        this.shortSpvWalletName = this.spvWalletName.replace("xr::", "");
        this.nodePubKey = p['nodePubKey'];
        if (isNullOrUndefined(this.spvWalletName)) {
          router.navigate(['']);
          return; 
        }
        this.loading = true;
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

    forkJoin([observableServiceNodeInfo]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([ spvInfo]) =>{
      this.loading = false;
      this.snodeVerified = true;
      this.result = spvInfo;
      this.location.replaceState("/spv-wallets/" + this.spvWalletName + "/" + this.result.node.nodePubKey);
      this.selectedSpvCommand = this.result.spvConfig.commands[0].command;
      this.nodeCount = 1;
      this.resultLoading = false;

    }, err => {
      // if(err.status == 404)
        this.router.navigate(['/error'], {queryParams: err});
    });
  }

  private callXrouterCommand(callback:Observable<object>){
    callback.pipe(
          finalize(() => {
            this.resultLoading = false;
        }))
        .subscribe(result => {
          this.spvWalletCommandResult = JSON.stringify(result, undefined, 2);
        },
        error => {
          this.spvWalletCommandResult = JSON.stringify(error, undefined, 2);
        });
  }

  onSubmit() {
    this.resultLoading = true;
    let nodecount = this.f.value.nodeCount;
    switch(this.f.value.selectedSpvCommand){
      case "xrGetBlockCount":{  
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlockCount(this.spvWalletName, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlockCount(this.spvWalletName, nodecount));
        break;    
      }
      case "xrGetBlockHash":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlockHash(this.spvWalletName, this.f.value.blockNumber, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else 
          this.callXrouterCommand(this.xrouterApiService.GetBlockHash(this.spvWalletName, this.f.value.blockNumber, nodecount));        
        break;
      }
      case "xrGetBlock":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlock(this.spvWalletName, this.f.value.blockHash, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlock(this.spvWalletName, this.f.value.blockHash, nodecount));
        break;
      }
      case "xrGetBlocks":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetBlocks(this.spvWalletName, this.blockHashes, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.GetBlocks(this.spvWalletName, this.blockHashes, nodecount));
        break;
      }
      case "xrGetTransaction":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetTransaction(this.spvWalletName, this.f.value.txid, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.GetTransaction(this.spvWalletName, this.f.value.txid, nodecount));
        break;
      }
      case "xrGetTransactions":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.GetTransactions(this.spvWalletName, this.txIds, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.GetTransactions(this.spvWalletName, this.txIds, nodecount));
        break;
      }
      case "xrDecodeRawTransaction":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.DecodeRawTransaction(this.spvWalletName, this.f.value.txHex, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.DecodeRawTransaction(this.spvWalletName, this.f.value.txHex, nodecount))        
        break;
      }
      case "xrSendTransaction":{
        if(this.enterprise) 
          this.callXrouterCommand(this.enterpriseXrouterApiService.SendTransaction(this.spvWalletName, this.f.value.signedTx, 'http://' + this.result.node.host + ':' + this.result.node.port));
        else
          this.callXrouterCommand(this.xrouterApiService.SendTransaction({blockchain: this.spvWalletName, signedTx: this.f.value.signedTx, nodeCount: nodecount}));
        break;
      }
    }
  }

  addTxId(){
    this.txIds.push("");
  }

  removeTxId(index: number){
    this.txIds.splice(index, 1);
  }

  addBlockHash(){
    this.blockHashes.push("");
  }

  removeBlockHash(index: number){
    this.blockHashes.splice(index, 1);
  }

  onSelectTryItOut(command:string){
    this.selectedSpvCommand = this.result.spvConfig.commands.find(c => c.command == command).command;

    this.onCommandSelectedSubject.next({title: 'Try it out', command: this.selectedSpvCommand})
  }

  ngOnInit() {}
  ngOnDestroy(){
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }

  trackByFn(index: any, item: any) {
    return index;
 }
}


