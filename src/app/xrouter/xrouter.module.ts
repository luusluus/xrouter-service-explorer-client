import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpvWalletDetailsComponent } from './xrouter-nodes/spv-wallet-details/spv-wallet-details.component';
import { SpvWalletsComponent } from './pages/spv-wallets/spv-wallets.component';
import { SpvWalletComponent } from './xrouter-nodes/spv-wallet/spv-wallet.component';
import { XrouterService } from './shared/services/xrouter.service';
import { EnterpriseXRouterService } from './shared/services/enterprise.xrouter.service';
import { XrouterRoutingModule } from './/xrouter-routing.module';
import { BlocknetCommonModule } from '../blocknet-common/blocknet-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '../ui/tabs/tabs.module';
import { CustomMinDirective } from './directives/custom-min-validator';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerModule } from '../ui/spinner/spinner.module';
import { LoadingInterceptor } from '../ui/spinner/interceptors/loading.interceptor';
import { SpvWalletsNodesComponent } from './xrouter-nodes/spv-wallets-nodes/spv-wallets-nodes.component';

@NgModule({
  imports: [
    CommonModule,
    
    BlocknetCommonModule,
    SpinnerModule,
    
    XrouterRoutingModule,
  ],
  declarations: [
    SpvWalletsComponent,
  ],
  providers:[
    XrouterService,
    EnterpriseXRouterService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class XrouterModule { }
