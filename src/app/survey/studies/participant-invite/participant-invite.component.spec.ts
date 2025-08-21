import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantInviteComponent } from './participant-invite.component';

describe('ParticipantInviteComponent', () => {
  let component: ParticipantInviteComponent;
  let fixture: ComponentFixture<ParticipantInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantInviteComponent]
    });
    fixture = TestBed.createComponent(ParticipantInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
