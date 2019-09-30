import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsReadMoreComponent } from './news-read-more.component';

describe('NewsReadMoreComponent', () => {
  let component: NewsReadMoreComponent;
  let fixture: ComponentFixture<NewsReadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsReadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
