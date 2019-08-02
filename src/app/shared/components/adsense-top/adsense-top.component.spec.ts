import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsenseTopComponent } from './adsense-top.component';

describe('AdsenseTopComponent', () => {
  let component: AdsenseTopComponent;
  let fixture: ComponentFixture<AdsenseTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsenseTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsenseTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
