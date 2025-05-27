import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Reservation } from '../../core/types/reservation.type';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-card-admin',
  imports: [DatePipe, MatSnackBarModule],
  templateUrl: './reservation-card-admin.component.html',
  styleUrl: './reservation-card-admin.component.scss'
})
export class ReservationCardAdminComponent {
  @Input() reservation?: Reservation
  reservationService = inject(ReservationService)
  snackBar = inject(MatSnackBar)
  @Output() edit = new EventEmitter<Reservation>()

  deleteReservation() {
    this.reservationService.deleteReservation(this.reservation?.id ?? '').subscribe({
      next: value => {
        // Recarrega as reservas atuais
        this.reservationService.loadCurrentReservations()

        // Da um feedback ao usuário que deu excluir a reserva
        this.snackBar.open('Reserva deletada com sucesso', '', {duration: 3000, panelClass: 'text-bg-success'})
      },
      error: error => {
        // Da um feedback ao usuário que houve um erro ao excluir a reserva
        this.snackBar.open('Ocorreu um erro ao tentar excluir essa reserva', '', {duration: 3000, panelClass: 'text-bg-danger'})
      }
    })
  }

  editReservation() {
    this.edit.emit(this.reservation)
  }
}
