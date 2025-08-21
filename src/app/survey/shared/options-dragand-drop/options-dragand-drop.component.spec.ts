import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDragandDropComponent } from './options-dragand-drop.component';

describe('OptionsDragandDropComponent', () => {
  let component: OptionsDragandDropComponent;
  let fixture: ComponentFixture<OptionsDragandDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsDragandDropComponent]
    });
    fixture = TestBed.createComponent(OptionsDragandDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
