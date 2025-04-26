import { Component } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';

@Component({
  selector: 'app-services-section',
  imports: [ServiceCardComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {

}
