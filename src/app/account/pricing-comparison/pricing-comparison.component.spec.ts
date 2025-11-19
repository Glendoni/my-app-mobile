import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingComparisonComponent } from './pricing-comparison.component';

describe('PricingComparisonComponent', () => {
  let component: PricingComparisonComponent;
  let fixture: ComponentFixture<PricingComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingComparisonComponent]
    });
    fixture = TestBed.createComponent(PricingComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
