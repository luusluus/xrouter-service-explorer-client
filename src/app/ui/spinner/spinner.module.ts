import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingService } from './shared/services/loading.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    LoadingService,
    LoadingInterceptor
  ],
})
export class SpinnerModule { }
