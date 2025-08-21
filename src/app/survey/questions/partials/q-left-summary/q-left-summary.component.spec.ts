import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLeftSummaryComponent } from './q-left-summary.component';

describe('QLeftSummaryComponent', () => {
  let component: QLeftSummaryComponent;
  let fixture: ComponentFixture<QLeftSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QLeftSummaryComponent]
    });
    fixture = TestBed.createComponent(QLeftSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
