import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOtherComponent } from './question-other.component';

describe('QuestionOtherComponent', () => {
  let component: QuestionOtherComponent;
  let fixture: ComponentFixture<QuestionOtherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionOtherComponent]
    });
    fixture = TestBed.createComponent(QuestionOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
