import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigatorService } from '../../../../shared/services/navigator.service.';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../shared/services/base.service';
import { XrouterService } from '../../../../xrouter/shared/services/xrouter.service';
// const NODEPUBKEY_REGEX = '^[0][a-zA-Z0-9]{65}$'; 
// const ADDRESS_REGEX = '^[B][a-zA-Z0-9]{33}$';
// const TXHASH_REGEX = '[a-zA-Z0-9]{64}$';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent extends BaseService implements OnInit {
  constructor(
    private xrouterService: XrouterService,
    private navigatorService: NavigatorService,
  ) {
    super();
  }

  keyword = 'name';
  services:any;
 
  ngOnInit(){
    this.xrouterService.getAllServices().subscribe(
      res => {
        this.services = res;
      }
    )
  }
  selectEvent(item) {
    let service = item.name as string;
    if(service.includes("xrs::")){
      this.navigatorService.xCloudServiceDetails(service);
    } else{
      this.navigatorService.spvWalletDetails(service);
    }
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    // this.http.get(this.baseEndpoint + this.apiEndpoint + "/?searchString=" + val).subscribe(
      this.xrouterService.search(val).subscribe(
      data => {
        this.services = data;
      }
    );
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }
}


