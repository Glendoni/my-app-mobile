import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionOptionsComponent } from './create-question-options.component';

describe('CreateQuestionOptionsComponent', () => {
  let component: CreateQuestionOptionsComponent;
  let fixture: ComponentFixture<CreateQuestionOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateQuestionOptionsComponent]
    });
    fixture = TestBed.createComponent(CreateQuestionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
