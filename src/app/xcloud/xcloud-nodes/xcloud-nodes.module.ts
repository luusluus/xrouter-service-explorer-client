import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule} from '../../ui/tabs/tabs.module';
import { BlocknetCommonModule } from '../../blocknet-common/blocknet-common.module';
import { XcloudServicesNodesComponent } from './xcloud-services-nodes/xcloud-services-nodes.component';
import { XCloudServiceDetailsComponent } from './xcloud-service-details/xcloud-service-details.component';
import { XCloudServiceComponent } from './xcloud-service/xcloud-service.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';


const routes: Routes = [
  { 
    path: ':breadcrumb', 
    component: XcloudServicesNodesComponent, 
    runGuardsAndResolvers: 'always',
  },
  { 
    path: ':name/:breadcrumb', 
    component: XCloudServiceComponent, 
    runGuardsAndResolvers: 'always' ,
  },
];

@NgModule({
  declarations: [
    XcloudServicesNodesComponent,
    XCloudServiceDetailsComponent, 
    XCloudServiceComponent,
  ],
  imports: [
    CommonModule,
    TabsModule,
    FormsModule,

    NgbModule,
    ReactiveFormsModule,
    PrettyJsonModule,
    ClipboardModule,
    
    BlocknetCommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class XcloudNodesModule { }
