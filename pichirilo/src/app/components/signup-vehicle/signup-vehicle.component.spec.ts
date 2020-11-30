import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVehicleComponent } from './signup-vehicle.component';

describe('SignupVehicleComponent', () => {
  let component: SignupVehicleComponent;
  let fixture: ComponentFixture<SignupVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
