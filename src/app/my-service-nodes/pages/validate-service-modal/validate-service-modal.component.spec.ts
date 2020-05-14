import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateServiceModalComponent } from './validate-service-modal.component';

describe('ValidateServiceModalComponent', () => {
  let component: ValidateServiceModalComponent;
  let fixture: ComponentFixture<ValidateServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
