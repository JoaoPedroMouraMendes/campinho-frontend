import { Component, Input } from '@angular/core';
import { Reservation } from '../../core/types/reservation.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-card',
  imports: [DatePipe],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent {
  @Input() reservation?: Reservation
}
