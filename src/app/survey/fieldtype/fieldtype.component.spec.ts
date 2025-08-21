import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldtypeComponent } from './fieldtype.component';

describe('FieldtypeComponent', () => {
  let component: FieldtypeComponent;
  let fixture: ComponentFixture<FieldtypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldtypeComponent]
    });
    fixture = TestBed.createComponent(FieldtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
