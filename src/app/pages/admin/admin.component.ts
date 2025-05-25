import { Component } from '@angular/core';
import { NavbarVerticalComponent } from '../../components/navbar-vertical/navbar-vertical.component';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { Reservation } from '../../core/types/reservation.type';
import { ReservationCardComponent } from '../../components/reservation-card/reservation-card.component';
import { CreateReservationModalComponent } from '../../components/create-reservation-modal/create-reservation-modal.component';

@Component({
  selector: 'app-admin',
  imports: [NavbarVerticalComponent, ReservationCardComponent, CreateReservationModalComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  currentReservations?: Reservation[]

  constructor(private readonly reservationService: ReservationService) { }

  ngOnInit() {
    try {
      this.reservationService.getCurrentReservations().subscribe(response => {
        this.currentReservations = response
      })
    } catch (error) {
      console.log(`Ocorreu um erro ao tentar buscar as reservas atuais: ${error}`)
    }
  }
}
