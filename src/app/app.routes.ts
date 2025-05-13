import { Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'agenda', component: ScheduleComponent}
];
