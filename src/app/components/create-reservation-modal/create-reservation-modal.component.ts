import { Component, inject } from '@angular/core';
import { FixedButtonComponent } from '../fixed-button/fixed-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { CreateReservation } from '../../core/types/createReservation.type';

@Component({
  selector: 'app-create-reservation-modal',
  imports: [FixedButtonComponent, ReactiveFormsModule],
  templateUrl: './create-reservation-modal.component.html',
  styleUrl: './create-reservation-modal.component.scss'
})
export class CreateReservationModalComponent {
  errorMessage: string = ''
  submitAttempted: boolean = false;
  form: FormGroup;
  reservationService = inject(ReservationService)

  constructor(private fb: FormBuilder) {
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
      },
      error: error => {
        // Adiciona mensagem de erro
        this.errorMessage = error.error.detail
      }
    })
  }
}
