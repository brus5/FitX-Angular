import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesCalculatorComponent } from './calories-calculator.component';

describe('ProfileComponent', () => {
  let component: CaloriesCalculatorComponent;
  let fixture: ComponentFixture<CaloriesCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaloriesCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
