import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ResponseTimeService {
    getResonseTime: Subject<number> = new Subject<number>();
    constructor() {}

    onGetResponseTime(event){
        this.getResonseTime.next(event);
    }        
}
