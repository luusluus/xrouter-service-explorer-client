
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error:any;

  constructor(    
    private router:Router, 
    private route: ActivatedRoute) {
      
    this.route.queryParams.subscribe(e => this.error = e);
  }

  ngOnInit() {}

}
