import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPointComponent } from './meeting-point.component';

describe('MeetingPointComponent', () => {
  let component: MeetingPointComponent;
  let fixture: ComponentFixture<MeetingPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingPointComponent]
    });
    fixture = TestBed.createComponent(MeetingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
