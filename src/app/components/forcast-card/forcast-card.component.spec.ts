import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastCardComponent } from './forcast-card.component';

describe('ForcastCardComponent', () => {
  let component: ForcastCardComponent;
  let fixture: ComponentFixture<ForcastCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
