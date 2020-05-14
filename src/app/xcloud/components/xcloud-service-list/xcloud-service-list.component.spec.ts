import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcloudServiceListComponent } from './xcloud-service-list.component';

describe('XcloudServiceListComponent', () => {
  let component: XcloudServiceListComponent;
  let fixture: ComponentFixture<XcloudServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XcloudServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcloudServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
