import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFollowComponent } from './social-follow.component';

describe('SocialFollowComponent', () => {
  let component: SocialFollowComponent;
  let fixture: ComponentFixture<SocialFollowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialFollowComponent]
    });
    fixture = TestBed.createComponent(SocialFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
