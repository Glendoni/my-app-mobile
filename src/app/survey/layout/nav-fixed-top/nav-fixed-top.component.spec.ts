import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFixedTopComponent } from './nav-fixed-top.component';

describe('NavFixedTopComponent', () => {
  let component: NavFixedTopComponent;
  let fixture: ComponentFixture<NavFixedTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavFixedTopComponent]
    });
    fixture = TestBed.createComponent(NavFixedTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
