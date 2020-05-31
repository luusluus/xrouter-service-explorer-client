import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceNodesComponent } from './pages/service-nodes/service-nodes.component';
import { ServiceNodeComponent } from './pages/service-node/service-node.component';

const routes : Routes = [
      { 
        path: '', 
        component: ServiceNodesComponent
      },
      { 
        path: ':breadcrumb', 
        component: ServiceNodeComponent,
        runGuardsAndResolvers: 'always' 
      },
      // { 
      //   path: ':nodePubKey/:service', 
      //   component: ServiceNodeComponent, 
      //   runGuardsAndResolvers: 'always' 
      // },
      
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SnodeRoutingModule { }
