import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QHeaderComponent } from './q-header.component';

describe('QHeaderComponent', () => {
  let component: QHeaderComponent;
  let fixture: ComponentFixture<QHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QHeaderComponent]
    });
    fixture = TestBed.createComponent(QHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
