import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDetailsComponent } from './study-details.component';

describe('StudyDetailsComponent', () => {
  let component: StudyDetailsComponent;
  let fixture: ComponentFixture<StudyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyDetailsComponent]
    });
    fixture = TestBed.createComponent(StudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
