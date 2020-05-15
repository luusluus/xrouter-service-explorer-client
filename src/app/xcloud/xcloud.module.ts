import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCloudServiceDetailsComponent } from './components/xcloud-service-details/xcloud-service-details.component';
import { XcloudRoutingModule } from './xcloud-routing.module';
import { XCloudServiceComponent } from './pages/xcloud-service/xcloud-service.component';
import { XCloudServicesComponent } from './pages/xcloud-services/xcloud-services.component';
import { BlocknetCommonModule } from '../blocknet-common/blocknet-common.module';
import { TabsModule } from '../ui/tabs/tabs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCloudService } from './shared/services/xcloud.service';
import { EnterpriseXCloudService } from './shared/services/enterprise.xcloud.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    XcloudRoutingModule,
    BlocknetCommonModule,
    TabsModule,
  ],
  declarations: [
    XCloudServiceDetailsComponent, 
    XCloudServiceComponent,
    XCloudServicesComponent
  ],
  providers:[
    XCloudService,
    EnterpriseXCloudService
  ]
})
export class XCloudModule { }
