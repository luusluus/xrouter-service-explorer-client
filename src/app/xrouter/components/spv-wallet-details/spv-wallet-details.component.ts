import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { SpvWalletInfo } from '../../shared/models/spvWalletInfo.model';

@Component({
  selector: 'app-spv-wallet-details',
  templateUrl: './spv-wallet-details.component.html',
  styleUrls: ['./spv-wallet-details.component.css']
})
export class SpvWalletDetailsComponent implements OnInit, OnChanges {

  @Input() spvWalletInfo:SpvWalletInfo;
  @Input() spvWalletName:string;
  @Input() nodePubKey:string;
  @Input() spvWalletCommandResult:string;
  @Output() onSPVSubmit = new EventEmitter();
  
  executing: boolean;

  minNodeCount:number = 1;
  nodeCount:number = 1;
  shortSpvWalletName:string;

  selectedSpvCommand:string;
  onCommandSelectedSubject: Subject<any> = new Subject<any>();

  @ViewChild('spvCallForm') form: NgForm;
  blockHashes:string[] = [""];
  txIds:string[] = [""];
  

  constructor() { }

  ngOnInit() {
    this.shortSpvWalletName = this.spvWalletName.replace("xr::", "");
    this.selectedSpvCommand = this.spvWalletInfo.spvConfig.commands[0].command;
    this.executing = false;
  }

  ngOnChanges(){
    this.executing = false;
  }

  onSubmit() {
    this.executing = true;
    this.onSPVSubmit.emit(
      {
        form: this.form, 
        blockHashes: this.blockHashes, 
        txIds : this.txIds, 
        nodeCount: this.nodeCount
      }
    );
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
    this.selectedSpvCommand = this.spvWalletInfo.spvConfig.commands.find(c => c.command == command).command;

    this.onCommandSelectedSubject.next({title: 'Try it out', command: this.selectedSpvCommand})
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}
