import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPrivacyPolicyComponent } from './customer-privacy-policy.component';

describe('CustomerPrivacyPolicyComponent', () => {
  let component: CustomerPrivacyPolicyComponent;
  let fixture: ComponentFixture<CustomerPrivacyPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPrivacyPolicyComponent]
    });
    fixture = TestBed.createComponent(CustomerPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
