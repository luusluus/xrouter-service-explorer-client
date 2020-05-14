import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpvWalletsComponent } from './pages/spv-wallets/spv-wallets.component';
import { SpvWalletComponent } from './pages/spv-wallet/spv-wallet.component';

const routes: Routes = [
  { path: 'spv-wallets', component: SpvWalletsComponent, runGuardsAndResolvers: 'always' },
  { path: 'spv-wallets/:name', component: SpvWalletComponent, runGuardsAndResolvers: 'always' },
  { path: 'spv-wallets/:name/:nodePubKey', component: SpvWalletComponent, runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class XrouterRoutingModule { }
