import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietAddProductComponent } from './diet-add-product.component';

describe('DietAddProductComponent', () => {
  let component: DietAddProductComponent;
  let fixture: ComponentFixture<DietAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
