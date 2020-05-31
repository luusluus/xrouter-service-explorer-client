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
    loadChildren: '../snode/snode.module#SnodeModule', 
    data: {
      breadcrumb: 'Service Nodes'
    }
  },
  { 
    path: 'xcloud-services', 
    loadChildren: '../xcloud/xcloud.module#XCloudModule', 
    data: {
      breadcrumb: 'XCloud Services'
    }
  },
  { 
    path: 'spv-wallets', 
    loadChildren: '../xrouter/xrouter.module#XrouterModule', 
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
