import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionNumberFieldComponent } from './option-number-field.component';

describe('OptionNumberFieldComponent', () => {
  let component: OptionNumberFieldComponent;
  let fixture: ComponentFixture<OptionNumberFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionNumberFieldComponent]
    });
    fixture = TestBed.createComponent(OptionNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
