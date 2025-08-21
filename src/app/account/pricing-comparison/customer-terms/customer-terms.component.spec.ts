import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTermsComponent } from './customer-terms.component';

describe('CustomerTermsComponent', () => {
  let component: CustomerTermsComponent;
  let fixture: ComponentFixture<CustomerTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerTermsComponent]
    });
    fixture = TestBed.createComponent(CustomerTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
