import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { CampinhoInfoComponent } from './components/campinho-info/campinho-info.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeBackgroundComponent, CampinhoInfoComponent, ServicesSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'campinho';
}
