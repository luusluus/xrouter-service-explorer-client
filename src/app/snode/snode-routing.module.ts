import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceNodesComponent } from './pages/service-nodes/service-nodes.component';
import { ServiceNodeComponent } from './pages/service-node/service-node.component';

const routes : Routes = [
      { path: 'xrouter-snodes', component: ServiceNodesComponent },
      { path: 'xrouter-snodes/:nodePubKey', component: ServiceNodeComponent, runGuardsAndResolvers: 'always' },
      { path: 'xrouter-snodes/:nodePubKey/:service', component: ServiceNodeComponent, runGuardsAndResolvers: 'always' },
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SnodeRoutingModule { }
