import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawOfDivisionEasyComponent } from './law-of-division-easy.component';

describe('LawOfDivisionEasyComponent', () => {
  let component: LawOfDivisionEasyComponent;
  let fixture: ComponentFixture<LawOfDivisionEasyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawOfDivisionEasyComponent]
    });
    fixture = TestBed.createComponent(LawOfDivisionEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
