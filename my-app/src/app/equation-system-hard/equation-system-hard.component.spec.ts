import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationSystemHardComponent } from './equation-system-hard.component';

describe('EquationSystemHardComponent', () => {
  let component: EquationSystemHardComponent;
  let fixture: ComponentFixture<EquationSystemHardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationSystemHardComponent]
    });
    fixture = TestBed.createComponent(EquationSystemHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
