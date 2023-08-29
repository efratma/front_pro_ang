import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythagorasHardComponent } from './pythagoras-hard.component';

describe('PythagorasHardComponent', () => {
  let component: PythagorasHardComponent;
  let fixture: ComponentFixture<PythagorasHardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PythagorasHardComponent]
    });
    fixture = TestBed.createComponent(PythagorasHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
