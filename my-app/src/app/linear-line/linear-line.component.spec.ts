import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearLineComponent } from './linear-line.component';

describe('LinearLineComponent', () => {
  let component: LinearLineComponent;
  let fixture: ComponentFixture<LinearLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinearLineComponent]
    });
    fixture = TestBed.createComponent(LinearLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
