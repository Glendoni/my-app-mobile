import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFieldComponent } from './editor-field.component';

describe('EditorFieldComponent', () => {
  let component: EditorFieldComponent;
  let fixture: ComponentFixture<EditorFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorFieldComponent]
    });
    fixture = TestBed.createComponent(EditorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
