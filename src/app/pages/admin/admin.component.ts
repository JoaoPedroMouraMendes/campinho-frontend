import { Component, inject } from '@angular/core';
import { NavbarVerticalComponent } from '../../components/navbar-vertical/navbar-vertical.component';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { Reservation } from '../../core/types/reservation.type';
import { CreateReservationModalComponent } from '../../components/create-reservation-modal/create-reservation-modal.component';
import { ReservationCardAdminComponent } from '../../components/reservation-card-admin/reservation-card-admin.component';
import { EditReservationModalComponent } from '../../components/edit-reservation-modal/edit-reservation-modal.component';

@Component({
  selector: 'app-admin',
  imports: [NavbarVerticalComponent, ReservationCardAdminComponent, CreateReservationModalComponent, EditReservationModalComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  selectedReservationToEdit?: Reservation
  currentReservations?: Reservation[]
  reservationService = inject(ReservationService)

  constructor() { }

  openEditModal(reservation: Reservation) {
    this.selectedReservationToEdit = reservation
  }
}
