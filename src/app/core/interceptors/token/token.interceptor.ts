import { HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYW1waW5oby1hcGkiLCJzdWIiOiJqb2FvLm1lbmRlczFAZ21haWwuY29tIiwiZXhwIjoxNzQ4Nzc0MDc3fQ.l4ZxfP6HJZR1PTi6P3vUATCcJ-raD5216ihvjBQSZIA` }
  })
  return next(authReq)
};
