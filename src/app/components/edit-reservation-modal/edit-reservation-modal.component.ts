import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Reservation } from '../../core/types/reservation.type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { UpdateReservation } from '../../core/types/updateReservation.type';
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
    return d.toTimeString().slice(0, 5); // 'HH:mm'
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
      // TODO resolver bug de fuso horário, ao enviar o objeto de data diretamente ele é enviado no padrão UTC e o backend converte para o horário de São Paulo porém a data já está no horário certo.
    const startDateTime = new Date(`${date}T${startTime}`)
    const endDateTime = new Date(`${date}T${endTime}`)

    const newReservation: UpdateReservation = {
      reservedBy: reservedBy,
      startTime: startDateTime,
      endTime: endDateTime
    }

    this.reservationService.editReservation(newReservation, this.reservation?.id ?? '').subscribe({
      next: response => {
        this.submitAttempted = false
        // Da um feedback ao usuário que a reserva foi alterada com sucesso
        this.snackBar.open('Reserva alterada com sucesso', '', { duration: 3000, panelClass: 'text-bg-success' })
        // Recarrega as reservas
        this.reservationService.loadCurrentReservations()
      },
      error: error => {
        // Da um feedback ao usuário que houve um erro ao tentar alterar uma reversa
        this.snackBar.open('Ocorreu um erro ao tentar alterar a reserva', '', { duration: 3000, panelClass: 'text-bg-danger' })
      }
    })

    this.closeModal()
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
