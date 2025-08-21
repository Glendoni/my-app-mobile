import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCenterComponent } from './q-center.component';

describe('QCenterComponent', () => {
  let component: QCenterComponent;
  let fixture: ComponentFixture<QCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QCenterComponent]
    });
    fixture = TestBed.createComponent(QCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
