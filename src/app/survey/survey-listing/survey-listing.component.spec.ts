import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListingComponent } from './survey-listing.component';

describe('SurveyListingComponent', () => {
  let component: SurveyListingComponent;
  let fixture: ComponentFixture<SurveyListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyListingComponent]
    });
    fixture = TestBed.createComponent(SurveyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
