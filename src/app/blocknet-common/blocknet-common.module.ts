import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SnodeInfoBlockComponent } from './components/snode-info-block/snode-info-block.component';
import { NodeListComponent } from './components/node-list/node-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ServiceListComponent,
    SnodeInfoBlockComponent,
    NodeListComponent
  ],
  exports:[
    ServiceListComponent,
    SnodeInfoBlockComponent,
    NodeListComponent
  ]
})
export class BlocknetCommonModule { }
