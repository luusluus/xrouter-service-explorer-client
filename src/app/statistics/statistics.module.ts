import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from './shared/services/stats.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    
  ],
  providers:[
    StatisticsService,
  ]
})
export class StatisticsModule { }
