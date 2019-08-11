import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietHoursComponent } from './diet-hours.component';

describe('DietHoursComponent', () => {
  let component: DietHoursComponent;
  let fixture: ComponentFixture<DietHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
