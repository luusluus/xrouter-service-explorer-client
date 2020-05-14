import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceNodeListComponent } from './service-node-list.component';

describe('ServiceNodeListComponent', () => {
  let component: ServiceNodeListComponent;
  let fixture: ComponentFixture<ServiceNodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceNodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceNodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
