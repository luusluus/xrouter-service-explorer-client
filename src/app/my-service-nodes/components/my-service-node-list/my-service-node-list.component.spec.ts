import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceNodeListComponent } from './my-service-node-list.component';

describe('MyServiceNodeListComponent', () => {
  let component: MyServiceNodeListComponent;
  let fixture: ComponentFixture<MyServiceNodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServiceNodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServiceNodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
