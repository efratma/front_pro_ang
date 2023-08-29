import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythagorasEasyComponent } from './pythagoras-easy.component';

describe('PythagorasEasyComponent', () => {
  let component: PythagorasEasyComponent;
  let fixture: ComponentFixture<PythagorasEasyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PythagorasEasyComponent]
    });
    fixture = TestBed.createComponent(PythagorasEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
