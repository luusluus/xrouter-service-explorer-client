import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  providers: [
      BreadcrumbsService
  ],
  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
