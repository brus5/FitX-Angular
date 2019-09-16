import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsWaitingRoomComponent } from './products-waiting-room.component';

describe('ProductsWaitingRoomComponent', () => {
  let component: ProductsWaitingRoomComponent;
  let fixture: ComponentFixture<ProductsWaitingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsWaitingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsWaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
