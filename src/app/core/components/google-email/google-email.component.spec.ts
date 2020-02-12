import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEmailComponent } from './google-email.component';

describe('GoogleEmailComponent', () => {
  let component: GoogleEmailComponent;
  let fixture: ComponentFixture<GoogleEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
