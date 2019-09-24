import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNutritionComponent } from './product-nutrition.component';

describe('ProductNutritionComponent', () => {
  let component: ProductNutritionComponent;
  let fixture: ComponentFixture<ProductNutritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNutritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
