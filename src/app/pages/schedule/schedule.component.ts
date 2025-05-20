import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ReservationContainerComponent } from '../../components/reservation-container/reservation-container.component';

@Component({
  selector: 'app-schedule',
  imports: [HeaderComponent, ReservationContainerComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
