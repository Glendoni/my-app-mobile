import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsDragAndDropComponent } from './questions-drag-and-drop.component';

describe('QuestionsDragAndDropComponent', () => {
  let component: QuestionsDragAndDropComponent;
  let fixture: ComponentFixture<QuestionsDragAndDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsDragAndDropComponent]
    });
    fixture = TestBed.createComponent(QuestionsDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
