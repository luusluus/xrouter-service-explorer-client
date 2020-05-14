import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpvWalletDetailsComponent } from './components/spv-wallet-details/spv-wallet-details.component';
import { SpvWalletListComponent } from './components/spv-wallet-list/spv-wallet-list.component';
import { SpvWalletsComponent } from './pages/spv-wallets/spv-wallets.component';
import { SpvWalletComponent } from './pages/spv-wallet/spv-wallet.component';
import { XrouterService } from './shared/services/xrouter.service';
import { EnterpriseXRouterService } from './shared/services/enterprise.xrouter.service';
import { XrouterRoutingModule } from './/xrouter-routing.module';
import { BlocknetCommonModule } from '../blocknet-common/blocknet-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '../ui/tabs/tabs.module';
import { CustomMinDirective } from './directives/custom-min-validator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    XrouterRoutingModule,
    BlocknetCommonModule,
    TabsModule
    
  ],
  declarations: [
    SpvWalletDetailsComponent,
    SpvWalletListComponent,
    SpvWalletsComponent,
    SpvWalletComponent,

    CustomMinDirective
  ],
  providers:[
    XrouterService,
    EnterpriseXRouterService
  ]
})
export class XrouterModule { }
