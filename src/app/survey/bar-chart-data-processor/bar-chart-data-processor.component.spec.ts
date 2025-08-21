import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartDataProceessorComponent } from './bar-chart-data-processor.component';

describe('BarChartDataProceessorComponent', () => {
  let component: BarChartDataProceessorComponent;
  let fixture: ComponentFixture<BarChartDataProceessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartDataProceessorComponent]
    });
    fixture = TestBed.createComponent(BarChartDataProceessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
