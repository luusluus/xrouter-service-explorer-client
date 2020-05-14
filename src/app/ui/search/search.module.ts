import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from './pages/search-form/search-form.component';
import { NavigatorService } from './../../shared/services/navigator.service.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
  ],
  exports:[
    SearchFormComponent
  ],
  declarations: [
    SearchFormComponent
  ],
  providers:[
    NavigatorService
  ]
})
export class SearchModule { }
