import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardAdminComponent } from './reservation-card-admin.component';

describe('ReservationCardAdminComponent', () => {
  let component: ReservationCardAdminComponent;
  let fixture: ComponentFixture<ReservationCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCardAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
