import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlocknetCommonModule } from '../../blocknet-common/blocknet-common.module';
import { TabsModule} from '../../ui/tabs/tabs.module';
import { SpvWalletsNodesComponent } from './spv-wallets-nodes/spv-wallets-nodes.component';
import { SpvWalletComponent } from './spv-wallet/spv-wallet.component';
import { SpvWalletDetailsComponent } from './spv-wallet-details/spv-wallet-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { 
    path: ':breadcrumb', 
    component: SpvWalletsNodesComponent, 
    runGuardsAndResolvers: 'always',
  },
  { 
    path: ':name/:breadcrumb', 
    component: SpvWalletComponent, 
    runGuardsAndResolvers: 'always' ,
  },
];

@NgModule({
  declarations: [
    SpvWalletDetailsComponent,
    SpvWalletsNodesComponent,
    SpvWalletComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    NgbModule,
    PrettyJsonModule,
    ClipboardModule,
    
    BlocknetCommonModule,
    TabsModule,
    RouterModule.forChild(routes)
  ]
})
export class XrouterNodesModule { }
