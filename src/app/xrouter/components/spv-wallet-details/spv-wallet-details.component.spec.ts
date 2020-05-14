import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpvWalletDetailsComponent } from './spv-wallet-details.component';

describe('SpvWalletDetailsComponent', () => {
  let component: SpvWalletDetailsComponent;
  let fixture: ComponentFixture<SpvWalletDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpvWalletDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpvWalletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
