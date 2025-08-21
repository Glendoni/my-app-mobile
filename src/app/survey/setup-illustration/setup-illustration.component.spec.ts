import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupIllustrationComponent } from './setup-illustration.component';

describe('SetupIllustrationComponent', () => {
  let component: SetupIllustrationComponent;
  let fixture: ComponentFixture<SetupIllustrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupIllustrationComponent]
    });
    fixture = TestBed.createComponent(SetupIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
