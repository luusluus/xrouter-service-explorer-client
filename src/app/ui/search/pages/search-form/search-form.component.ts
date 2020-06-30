import { Component, OnInit, ViewChild } from '@angular/core';
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
export class SearchFormComponent extends BaseService {
  constructor(
    private xrouterService: XrouterService,
    private navigatorService: NavigatorService,
  ) {
    super();
      this.xrouterService.GetNetworkServices().subscribe(
      data => {
        let temp = data["reply"]["nodeCounts"];
        this.nodeCounts = Object.keys(temp).map(i => {
          return {name: i, nodeCount: temp[i]}
        });
      }
    )
  }

  @ViewChild('auto', { static: true }) auto;

  keyword = 'name';
  public nodeCounts:any;
  isLoading = false;
 
  selectEvent(item) {
    let service = item.name as string;
    if(service.includes("xrs::")){
      this.navigatorService.xCloudServiceDetails(service);
    } else{
      this.navigatorService.spvWalletDetails(service);
    }
    
  }
 
  onChangeSearch(val: string) {
    this.isLoading = true;
    this.xrouterService.search(val).subscribe(
      data => {
        let temp = data["nodeCounts"];
        this.nodeCounts = Object.keys(temp).map(i => {
          return {name: i, nodeCount: temp[i]}
        });
        this.isLoading = false;
      }
  );
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focuse
  }

  onOpened(e){
    
  }

  openPanel(e): void {
    
    
    this.auto.open();
  } 

}


