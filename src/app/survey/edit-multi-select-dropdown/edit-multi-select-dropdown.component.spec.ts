import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMultiSelectDropdownComponent } from './edit-multi-select-dropdown.component';

describe('EditMultiSelectDropdownComponent', () => {
  let component: EditMultiSelectDropdownComponent;
  let fixture: ComponentFixture<EditMultiSelectDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMultiSelectDropdownComponent]
    });
    fixture = TestBed.createComponent(EditMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
