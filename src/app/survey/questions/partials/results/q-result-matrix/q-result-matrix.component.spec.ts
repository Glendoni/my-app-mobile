import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QResultMatrixComponent } from './q-result-matrix.component';

describe('QResultMatrixComponent', () => {
  let component: QResultMatrixComponent;
  let fixture: ComponentFixture<QResultMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QResultMatrixComponent]
    });
    fixture = TestBed.createComponent(QResultMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
