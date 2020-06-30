import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {
      breadcrumb: 'Home'
    }
  },
  { 
    path: '**', 
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      useHash: true,
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
