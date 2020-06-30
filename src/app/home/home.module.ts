import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const HOME_ROUTES: Routes = [
  {
      path: '',
      component: HomeComponent
  },
  { 
    path: 'xrouter-snodes', 
    loadChildren: () => import('../snode/snode.module').then(m => m.SnodeModule), 
    data: {
      breadcrumb: 'Service Nodes'
    }
  },
  { 
    path: 'xcloud-services', 
    loadChildren: () => import('../xcloud/xcloud.module').then(m => m.XCloudModule), 
    data: {
      breadcrumb: 'XCloud Services'
    }
  },
  { 
    path: 'spv-wallets', 
    loadChildren: () => import('../xrouter/xrouter.module').then(m => m.XrouterModule), 
    data: {
      breadcrumb: 'SPV Wallets'
    }
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule { }
