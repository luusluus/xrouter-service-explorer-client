import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

const routes : Routes = [
  { path: 'error', component: ErrorComponent},
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ErrorRoutingModule { }
