import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRequestsComponent } from './join-requests.component';

describe('JoinRequestsComponent', () => {
  let component: JoinRequestsComponent;
  let fixture: ComponentFixture<JoinRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinRequestsComponent]
    });
    fixture = TestBed.createComponent(JoinRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
