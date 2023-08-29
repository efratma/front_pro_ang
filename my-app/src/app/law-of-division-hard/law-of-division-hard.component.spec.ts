import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawOfDivisionHardComponent } from './law-of-division-hard.component';

describe('LawOfDivisionHardComponent', () => {
  let component: LawOfDivisionHardComponent;
  let fixture: ComponentFixture<LawOfDivisionHardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawOfDivisionHardComponent]
    });
    fixture = TestBed.createComponent(LawOfDivisionHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
