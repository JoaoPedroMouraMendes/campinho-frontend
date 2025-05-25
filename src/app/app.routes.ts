import { Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'agenda', component: ScheduleComponent},
  {path: 'admin', component: AdminComponent}
];
