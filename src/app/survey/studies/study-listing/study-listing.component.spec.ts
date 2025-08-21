import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyListingComponent } from './study-listing.component';

describe('StudyListingComponent', () => {
  let component: StudyListingComponent;
  let fixture: ComponentFixture<StudyListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyListingComponent]
    });
    fixture = TestBed.createComponent(StudyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
