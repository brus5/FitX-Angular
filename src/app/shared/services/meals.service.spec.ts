import { TestBed } from '@angular/core/testing';

import { MealsHours } from './meals-hours.service';

describe('MealsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealsHours = TestBed.get(MealsHours);
    expect(service).toBeTruthy();
  });
});
