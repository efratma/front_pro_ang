import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationInOneVanishingMediumComponent } from './equation-in-one-vanishing-medium.component';

describe('EquationInOneVanishingMediumComponent', () => {
  let component: EquationInOneVanishingMediumComponent;
  let fixture: ComponentFixture<EquationInOneVanishingMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationInOneVanishingMediumComponent]
    });
    fixture = TestBed.createComponent(EquationInOneVanishingMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
