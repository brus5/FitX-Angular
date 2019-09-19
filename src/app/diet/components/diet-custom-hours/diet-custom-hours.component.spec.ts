import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietCustomHoursComponent } from './diet-custom-hours.component';

describe('DietCustomHoursComponent', () => {
  let component: DietCustomHoursComponent;
  let fixture: ComponentFixture<DietCustomHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietCustomHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietCustomHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
