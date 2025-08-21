import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartProcessorComponent } from './doughnut-chart-processor.component';

describe('DoughnutChartProcessorComponent', () => {
  let component: DoughnutChartProcessorComponent;
  let fixture: ComponentFixture<DoughnutChartProcessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoughnutChartProcessorComponent]
    });
    fixture = TestBed.createComponent(DoughnutChartProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
