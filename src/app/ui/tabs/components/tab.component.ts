/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  
  @Output('tab-changed') tabChanged = new EventEmitter();
  
  onSelectTab(e){
    console.log(e)
    // this.tabChanged.emit(this);
  }

}
