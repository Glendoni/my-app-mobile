import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPaymentCheckerComponent } from './link-payment-checker.component';

describe('LinkPaymentCheckerComponent', () => {
  let component: LinkPaymentCheckerComponent;
  let fixture: ComponentFixture<LinkPaymentCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkPaymentCheckerComponent]
    });
    fixture = TestBed.createComponent(LinkPaymentCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
