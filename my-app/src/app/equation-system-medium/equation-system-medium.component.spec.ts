import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationSystemMediumComponent } from './equation-system-medium.component';

describe('EquationSystemMediumComponent', () => {
  let component: EquationSystemMediumComponent;
  let fixture: ComponentFixture<EquationSystemMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationSystemMediumComponent]
    });
    fixture = TestBed.createComponent(EquationSystemMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
