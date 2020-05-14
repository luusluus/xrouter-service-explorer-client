import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XCloudServicesComponent } from './pages/xcloud-services/xcloud-services.component';
import { XCloudServiceComponent } from './pages/xcloud-service/xcloud-service.component';

const routes : Routes = [
  { path: 'xcloud-services', component: XCloudServicesComponent, runGuardsAndResolvers: 'always' },
  { path: 'xcloud-services/:name', component: XCloudServiceComponent, runGuardsAndResolvers: 'always' },
  { path: 'xcloud-services/:name/:nodePubKey', component: XCloudServiceComponent, runGuardsAndResolvers: 'always' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class XcloudRoutingModule { }
