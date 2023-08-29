import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedProblemsComponent } from './solved-problems.component';

describe('SolvedProblemsComponent', () => {
  let component: SolvedProblemsComponent;
  let fixture: ComponentFixture<SolvedProblemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolvedProblemsComponent]
    });
    fixture = TestBed.createComponent(SolvedProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
