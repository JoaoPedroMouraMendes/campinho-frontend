import { Component, inject } from '@angular/core';
import { FixedButtonComponent } from '../fixed-button/fixed-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { CreateReservation } from '../../core/types/createReservation.type';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-reservation-modal',
  imports: [FixedButtonComponent, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './create-reservation-modal.component.html',
  styleUrl: './create-reservation-modal.component.scss'
})
export class CreateReservationModalComponent {
  errorMessage: string = ''
  submitAttempted: boolean = false;
  form: FormGroup;
  reservationService = inject(ReservationService)
  fb = inject(FormBuilder)
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

  submit(event: SubmitEvent) {
    event.preventDefault()

    this.submitAttempted = true

    if (this.form.invalid) {
      return;
    }

    // Obtem os inputs do form
    const { reservedBy, date, startTime, endTime } = this.form.value

    const startDateTime = new Date(`${date}T${startTime}`)
    const endDateTime = new Date(`${date}T${endTime}`)

    const newReservation: CreateReservation = {
      reservedBy: reservedBy,
      startTime: startDateTime,
      endTime: endDateTime
    }

    // Tenta criar uma reserva
    this.reservationService.createReservation(newReservation).subscribe({
      next: response => {
        // Remove a mensagem de erro
        this.errorMessage = ''

        this.form.reset()
        this.submitAttempted = false
        // Recarrega as reservas disponiveis
        this.reservationService.loadCurrentReservations()
        // Da um feedback ao usuário que a reserva foi criado com sucesso
        this.snackBar.open('Reserva criado com sucesso', '', { duration: 3000, panelClass: 'text-bg-success' })
      },
      error: error => {
        // Adiciona mensagem de erro
        this.errorMessage = error.error.detail
        // Da um feedback ao usuário que houve um erro ao tentar criar uma reversa
        this.snackBar.open('Ocorreu um erro ao tentar criar a reserva', '', { duration: 3000, panelClass: 'text-bg-danger' })
      }
    })
  }
}
