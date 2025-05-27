import { Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'agenda', component: ScheduleComponent },
  { path: 'admin/agenda', component: AdminComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }
];
