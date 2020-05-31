import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XCloudServicesComponent } from './pages/xcloud-services/xcloud-services.component';

const routes : Routes = [
  { 
    path: '', 
    component: XCloudServicesComponent, 
    runGuardsAndResolvers: 'always',
  },
  { 
    path: 'nodes', 
    loadChildren: './xcloud-nodes/xcloud-nodes.module#XcloudNodesModule', 
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class XcloudRoutingModule { }
