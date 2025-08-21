import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRightAppMenuComponent } from './q-right-app-menu.component';

describe('QRightAppMenuComponent', () => {
  let component: QRightAppMenuComponent;
  let fixture: ComponentFixture<QRightAppMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRightAppMenuComponent]
    });
    fixture = TestBed.createComponent(QRightAppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
