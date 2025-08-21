import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingAddPasswordComponent } from './onboarding-add-password.component';

describe('OnboardingAddPasswordComponent', () => {
  let component: OnboardingAddPasswordComponent;
  let fixture: ComponentFixture<OnboardingAddPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingAddPasswordComponent]
    });
    fixture = TestBed.createComponent(OnboardingAddPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
