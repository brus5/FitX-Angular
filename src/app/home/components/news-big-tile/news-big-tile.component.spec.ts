import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBigTileComponent } from './news-big-tile.component';

describe('NewsBigTileComponent', () => {
  let component: NewsBigTileComponent;
  let fixture: ComponentFixture<NewsBigTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsBigTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBigTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
