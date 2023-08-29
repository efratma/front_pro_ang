import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuttingPointsComponent } from './cutting-points.component';

describe('CuttingPointsComponent', () => {
  let component: CuttingPointsComponent;
  let fixture: ComponentFixture<CuttingPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuttingPointsComponent]
    });
    fixture = TestBed.createComponent(CuttingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
