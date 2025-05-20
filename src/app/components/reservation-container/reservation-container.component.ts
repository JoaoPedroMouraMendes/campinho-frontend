import { Component } from '@angular/core';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { Reservation } from '../../core/types/reservation.type';
import { ReservationService } from '../../core/services/reservation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-container',
  imports: [ReservationCardComponent, DatePipe],
  templateUrl: './reservation-container.component.html',
  styleUrl: './reservation-container.component.scss'
})
export class ReservationContainerComponent {
  currentReservations?: Reservation[]

  constructor(private readonly reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getCurrentReservations().subscribe({
      next: (response) => {
        this.currentReservations = response
      },
      error: (error) => {
        console.log(`Ocorreu um erro ao tentar buscar reservas atuais: ${error.message}`)
      }
    })
  }
}
