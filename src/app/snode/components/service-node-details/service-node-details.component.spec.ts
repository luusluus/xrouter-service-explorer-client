import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceNodeDetailsComponent } from './service-node-details.component';

describe('ServiceNodeDetailsComponent', () => {
  let component: ServiceNodeDetailsComponent;
  let fixture: ComponentFixture<ServiceNodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceNodeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceNodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
