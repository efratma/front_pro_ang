import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationInOneVanishingEasyComponent } from './equation-in-one-vanishing-easy.component';

describe('EquationInOneVanishingEasyComponent', () => {
  let component: EquationInOneVanishingEasyComponent;
  let fixture: ComponentFixture<EquationInOneVanishingEasyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationInOneVanishingEasyComponent]
    });
    fixture = TestBed.createComponent(EquationInOneVanishingEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
