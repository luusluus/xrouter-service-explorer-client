import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tab-list.component';
import { TabComponent } from './components/tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    TabsComponent,
    TabComponent
  ],
  declarations: [
    TabsComponent,
    TabComponent
  ]
})
export class TabsModule { }
