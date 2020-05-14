import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  declarations: [
    ErrorComponent
  ],
  providers:[
    HttpErrorInterceptor
  ]
})
export class ErrorModule { }
