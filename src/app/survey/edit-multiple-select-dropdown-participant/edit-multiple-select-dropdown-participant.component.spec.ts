import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMultipleSelectDropdownParticipantComponent } from './edit-multiple-select-dropdown-participant.component';

describe('EditMultipleSelectDropdownParticipantComponent', () => {
  let component: EditMultipleSelectDropdownParticipantComponent;
  let fixture: ComponentFixture<EditMultipleSelectDropdownParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMultipleSelectDropdownParticipantComponent]
    });
    fixture = TestBed.createComponent(EditMultipleSelectDropdownParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
