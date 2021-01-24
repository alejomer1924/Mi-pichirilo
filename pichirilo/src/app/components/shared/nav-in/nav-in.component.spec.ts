import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavInComponent } from './nav-in.component';

describe('NavInComponent', () => {
  let component: NavInComponent;
  let fixture: ComponentFixture<NavInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
