import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpvWalletsComponent } from './pages/spv-wallets/spv-wallets.component';
import { SpvWalletComponent } from './xrouter-nodes/spv-wallet/spv-wallet.component';
import { SpvWalletsNodesComponent } from './xrouter-nodes/spv-wallets-nodes/spv-wallets-nodes.component';

const routes: Routes = [
  { 
    path: '', 
    component: SpvWalletsComponent, 
    runGuardsAndResolvers: 'always',
  },
  { 
    path: 'nodes', 
    loadChildren: './xrouter-nodes/xrouter-nodes.module#XrouterNodesModule', 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class XrouterRoutingModule { }
