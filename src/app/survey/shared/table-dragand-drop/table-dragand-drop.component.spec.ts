import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDragandDropComponent } from './table-dragand-drop.component';

describe('TableDragandDropComponent', () => {
  let component: TableDragandDropComponent;
  let fixture: ComponentFixture<TableDragandDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDragandDropComponent]
    });
    fixture = TestBed.createComponent(TableDragandDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
