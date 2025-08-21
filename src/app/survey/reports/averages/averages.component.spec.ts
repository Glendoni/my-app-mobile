import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragesComponent } from './averages.component';

describe('AveragesComponent', () => {
  let component: AveragesComponent;
  let fixture: ComponentFixture<AveragesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AveragesComponent]
    });
    fixture = TestBed.createComponent(AveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
