import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${storageService.getToken()}` }
  })
  return next(authReq)
};
