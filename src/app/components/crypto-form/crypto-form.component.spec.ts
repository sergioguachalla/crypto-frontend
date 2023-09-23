import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoFormComponent } from './crypto-form.component';

describe('CryptoFormComponent', () => {
  let component: CryptoFormComponent;
  let fixture: ComponentFixture<CryptoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoFormComponent]
    });
    fixture = TestBed.createComponent(CryptoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
