import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSelectionComponent } from './topic-selection.component';

describe('TopicSelectionComponent', () => {
  let component: TopicSelectionComponent;
  let fixture: ComponentFixture<TopicSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicSelectionComponent]
    });
    fixture = TestBed.createComponent(TopicSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
