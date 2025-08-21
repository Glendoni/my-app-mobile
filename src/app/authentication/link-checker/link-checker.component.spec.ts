import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCheckerComponent } from './link-checker.component';

describe('LinkCheckerComponent', () => {
  let component: LinkCheckerComponent;
  let fixture: ComponentFixture<LinkCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkCheckerComponent]
    });
    fixture = TestBed.createComponent(LinkCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
