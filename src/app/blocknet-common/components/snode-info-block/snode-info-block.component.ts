import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snode-info-block',
  templateUrl: './snode-info-block.component.html',
  styleUrls: ['./snode-info-block.component.css']
})
export class SnodeInfoBlockComponent implements OnInit {

  @Input('snodeInfo') snodeInfo:any;
  constructor(private router:Router,) { }

  ngOnInit() {
  }

}
