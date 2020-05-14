import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyServiceNodesComponent } from './pages/my-service-nodes/my-service-nodes.component';
import { AuthGuard } from '../core/authentication/auth.guard';

const routes : Routes = [
  { path: 'my-service-nodes/:id', component: MyServiceNodesComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SnodeRoutingModule { }
