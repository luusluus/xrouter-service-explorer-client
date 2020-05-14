import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcloudServiceDetailsComponent } from './xcloud-service-details.component';

describe('XcloudServiceDetailsComponent', () => {
  let component: XcloudServiceDetailsComponent;
  let fixture: ComponentFixture<XcloudServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XcloudServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcloudServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
