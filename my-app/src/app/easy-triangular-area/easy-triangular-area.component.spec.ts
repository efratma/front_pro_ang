import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyTriangularAreaComponent } from './easy-triangular-area.component';

describe('EasyTriangularAreaComponent', () => {
  let component: EasyTriangularAreaComponent;
  let fixture: ComponentFixture<EasyTriangularAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EasyTriangularAreaComponent]
    });
    fixture = TestBed.createComponent(EasyTriangularAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
