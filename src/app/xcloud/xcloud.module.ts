import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCloudServiceDetailsComponent } from './xcloud-nodes/xcloud-service-details/xcloud-service-details.component';
import { XcloudRoutingModule } from './xcloud-routing.module';
import { XCloudServiceComponent } from './xcloud-nodes/xcloud-service/xcloud-service.component';
import { XCloudServicesComponent } from './pages/xcloud-services/xcloud-services.component';
import { BlocknetCommonModule } from '../blocknet-common/blocknet-common.module';
import { TabsModule } from '../ui/tabs/tabs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCloudService } from './shared/services/xcloud.service';
import { EnterpriseXCloudService } from './shared/services/enterprise.xcloud.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../ui/spinner/interceptors/loading.interceptor';
import { SpinnerModule } from '../ui/spinner/spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceModule } from '../invoice/invoice.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InvoiceModule,
    BlocknetCommonModule,
    
    SpinnerModule,
    
    XcloudRoutingModule,
  ],
  declarations: [
    XCloudServicesComponent
  ],
  providers:[
    XCloudService,
    EnterpriseXCloudService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class XCloudModule { }
