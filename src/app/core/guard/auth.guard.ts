import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

// Para acessar rotas restritas é necessário estar logado e ter o cargo ADMIN
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true
  }

  router.navigate(['/login'])
  return false
};
