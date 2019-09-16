import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardWaitingComponent } from './product-card-waiting.component';

describe('ProductCardWaitingComponentComponent', () => {
  let component: ProductCardWaitingComponent;
  let fixture: ComponentFixture<ProductCardWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
