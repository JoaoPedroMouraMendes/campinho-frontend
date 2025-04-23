import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { CampinhoInfoComponent } from './components/campinho-info/campinho-info.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeBackgroundComponent, CampinhoInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'campinho';
}
