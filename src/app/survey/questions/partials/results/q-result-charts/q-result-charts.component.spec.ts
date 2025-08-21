import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QResultChartsComponent } from './q-result-charts.component';

describe('QResultChartsComponent', () => {
  let component: QResultChartsComponent;
  let fixture: ComponentFixture<QResultChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QResultChartsComponent]
    });
    fixture = TestBed.createComponent(QResultChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
