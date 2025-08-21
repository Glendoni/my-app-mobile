import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartHorizontalProcessorComponent } from './bar-chart-horizontal-processor.component';

describe('BarChartHorizontalProcessorComponent', () => {
  let component: BarChartHorizontalProcessorComponent;
  let fixture: ComponentFixture<BarChartHorizontalProcessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartHorizontalProcessorComponent]
    });
    fixture = TestBed.createComponent(BarChartHorizontalProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
