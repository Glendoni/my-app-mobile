import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeNotificationComponent } from './upgrade-notification.component';

describe('UpgradeNotificationComponent', () => {
  let component: UpgradeNotificationComponent;
  let fixture: ComponentFixture<UpgradeNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradeNotificationComponent]
    });
    fixture = TestBed.createComponent(UpgradeNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
