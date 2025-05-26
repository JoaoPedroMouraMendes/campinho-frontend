import { Component, inject } from '@angular/core';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { Reservation } from '../../core/types/reservation.type';
import { ReservationService } from '../../core/services/reservation/reservation.service';

@Component({
  selector: 'app-reservation-container',
  imports: [ReservationCardComponent],
  templateUrl: './reservation-container.component.html',
  styleUrl: './reservation-container.component.scss'
})
export class ReservationContainerComponent {
  reservationService = inject(ReservationService)

  constructor() { }
}
