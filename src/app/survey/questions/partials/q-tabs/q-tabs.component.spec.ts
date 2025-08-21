import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QTabsComponent } from './q-tabs.component';

describe('QTabsComponent', () => {
  let component: QTabsComponent;
  let fixture: ComponentFixture<QTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QTabsComponent]
    });
    fixture = TestBed.createComponent(QTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
