import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationSystemEasyComponent } from './equation-system-easy.component';

describe('EquationSystemEasyComponent', () => {
  let component: EquationSystemEasyComponent;
  let fixture: ComponentFixture<EquationSystemEasyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationSystemEasyComponent]
    });
    fixture = TestBed.createComponent(EquationSystemEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
