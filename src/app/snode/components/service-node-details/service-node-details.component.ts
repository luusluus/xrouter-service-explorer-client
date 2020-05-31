import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-node-details',
  templateUrl: './service-node-details.component.html',
  styleUrls: ['./service-node-details.component.css']
})
export class ServiceNodeDetailsComponent implements OnInit {

  @Input() nodePubKey:string;
  @Input() service:string;
  @Input() xCloudServices:any;
  @Input() serviceNodeInfo:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }

}
