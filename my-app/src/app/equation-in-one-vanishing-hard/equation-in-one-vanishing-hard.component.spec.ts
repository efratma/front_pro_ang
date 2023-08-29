import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationInOneVanishingHardComponent } from './equation-in-one-vanishing-hard.component';

describe('EquationInOneVanishingHardComponent', () => {
  let component: EquationInOneVanishingHardComponent;
  let fixture: ComponentFixture<EquationInOneVanishingHardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquationInOneVanishingHardComponent]
    });
    fixture = TestBed.createComponent(EquationInOneVanishingHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
