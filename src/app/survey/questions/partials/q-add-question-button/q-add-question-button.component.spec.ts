import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAddQuestionButtonComponent } from './q-add-question-button.component';

describe('QAddQuestionButtonComponent', () => {
  let component: QAddQuestionButtonComponent;
  let fixture: ComponentFixture<QAddQuestionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QAddQuestionButtonComponent]
    });
    fixture = TestBed.createComponent(QAddQuestionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
