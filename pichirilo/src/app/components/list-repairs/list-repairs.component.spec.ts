import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepairsComponent } from './list-repairs.component';

describe('ListRepairsComponent', () => {
  let component: ListRepairsComponent;
  let fixture: ComponentFixture<ListRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
