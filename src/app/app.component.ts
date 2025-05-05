import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { CampinhoInfoComponent } from './components/campinho-info/campinho-info.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { LocationSectionComponent } from './components/location-section/location-section.component';
import { PricingSectionComponent } from './components/pricing-section/pricing-section.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeBackgroundComponent, CampinhoInfoComponent,
    ServicesSectionComponent, LocationSectionComponent, PricingSectionComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'campinho';
}
