import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Reservation } from '../../core/types/reservation.type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { UpdateReservation } from '../../core/types/update-reservation.type';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-edit-reservation-modal',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './edit-reservation-modal.component.html',
  styleUrl: './edit-reservation-modal.component.scss'
})
export class EditReservationModalComponent {
  errorMessage: string = ''
  submitAttempted: boolean = false;
  @Input() reservation?: Reservation
  fb = inject(FormBuilder)
  form: FormGroup
  reservationService = inject(ReservationService)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.form = this.fb.group(
      {
        reservedBy: ['', Validators.required],
        date: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reservation'] && this.reservation) {
      this.form.patchValue({
        reservedBy: this.reservation.reservedBy,
        date: this.formatDate(this.reservation.startTime),
        startTime: this.formatTime(this.reservation.startTime),
        endTime: this.formatTime(this.reservation.endTime)
      });
    }
  }

  private formatTime(date: string | Date): string {
    const d = new Date(date);
    return d.toTimeString().slice(0, 5); // Retorna 'HH:mm'
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Retorna 'yyyy-MM-dd'
  }

  submit(event: SubmitEvent) {
    event.preventDefault()

    this.submitAttempted = true

    if (this.form.invalid) {
      return;
    }

    // Obtem os inputs do form
    const { reservedBy, date, startTime, endTime } = this.form.value

    const startDateTime = `${date}T${startTime}`
    const endDateTime = `${date}T${endTime}`

    const newReservation: UpdateReservation = {
      reservedBy: reservedBy,
      startTime: startDateTime,
      endTime: endDateTime
    }

    this.reservationService.editReservation(newReservation, this.reservation?.id ?? '').subscribe({
      next: response => {
        this.submitAttempted = false
        // Da um feedback ao usuário que a reserva foi alterada com sucesso
        this.snackBar.open('Reserva alterada com sucesso', '', { duration: 300000, panelClass: ['text-success', 'rounded'] })
        // Recarrega as reservas
        this.reservationService.loadCurrentReservations()
        // Fecha o modal
        this.closeModal()
      },
      error: error => {
        // Exibe uma mensagem de erro no modal
        this.errorMessage = error.error.detail
      }
    })
  }

  openModal() {
    const modalElement = document.getElementById('edit-reservation')
    if (modalElement) {
      const modal = new Modal(modalElement)
      modal.show()
    }
  }

  closeModal() {
    const modalElement = document.getElementById('edit-reservation')
    if (modalElement) {
      const modal = Modal.getInstance(modalElement)
      modal?.hide()
    }
  }
}
