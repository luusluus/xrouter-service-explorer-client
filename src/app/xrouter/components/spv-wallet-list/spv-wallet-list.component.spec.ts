import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpvWalletListComponent } from './spv-wallet-list.component';

describe('SpvWalletListComponent', () => {
  let component: SpvWalletListComponent;
  let fixture: ComponentFixture<SpvWalletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpvWalletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpvWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
