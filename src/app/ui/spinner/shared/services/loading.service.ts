import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
  isLoading:boolean

  public setLoading(val:boolean){
    this.isLoading = val;
  }
  constructor() { }
}
