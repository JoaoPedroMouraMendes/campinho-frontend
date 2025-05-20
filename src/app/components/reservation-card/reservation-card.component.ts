import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-card',
  imports: [],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent {
  @Input() reservedBy?: string
  @Input() date?: string | null
  @Input() startTime?: string | null
  @Input() endTime?: string | null
}
