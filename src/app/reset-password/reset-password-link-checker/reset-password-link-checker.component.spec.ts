import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordLinkCheckerComponent } from './reset-password-link-checker.component';

describe('ResetPasswordLinkCheckerComponent', () => {
  let component: ResetPasswordLinkCheckerComponent;
  let fixture: ComponentFixture<ResetPasswordLinkCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordLinkCheckerComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordLinkCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
