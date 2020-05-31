import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnodeRoutingModule } from './/snode-routing.module';
import { ServiceNodeDetailsComponent } from './components/service-node-details/service-node-details.component';
import { ServiceNodeComponent } from './pages/service-node/service-node.component';
import { ServiceNodesComponent } from './pages/service-nodes/service-nodes.component';
import { ServiceNodeService } from './shared/services/snode.service';
import { BlocknetCommonModule } from '../blocknet-common/blocknet-common.module';
import { TabsModule } from '../ui/tabs/tabs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCloudModule } from '../xcloud/xcloud.module';
import { XrouterModule } from '../xrouter/xrouter.module';
import { ServiceNodeListComponent } from './components/service-node-list/service-node-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../ui/spinner/interceptors/loading.interceptor';
import { SpinnerModule } from '../ui/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    BlocknetCommonModule,
    TabsModule,
    SpinnerModule,
        
    SnodeRoutingModule,
  ],
  declarations: [
    ServiceNodeComponent,
    ServiceNodesComponent,
    ServiceNodeDetailsComponent, 
    ServiceNodeListComponent
  ],
  providers: [
    ServiceNodeService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class SnodeModule { }
