import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QResultQuotaComponent } from './q-result-quota.component';

describe('QResultQuotaComponent', () => {
  let component: QResultQuotaComponent;
  let fixture: ComponentFixture<QResultQuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QResultQuotaComponent]
    });
    fixture = TestBed.createComponent(QResultQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
