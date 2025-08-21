import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartProcessorComponent } from './pie-chart-processor.component';

describe('PieChartProcessorComponent', () => {
  let component: PieChartProcessorComponent;
  let fixture: ComponentFixture<PieChartProcessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieChartProcessorComponent]
    });
    fixture = TestBed.createComponent(PieChartProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
