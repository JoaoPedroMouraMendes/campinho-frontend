import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const dateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        return event.clone({ body: convertDates(event.body) });
      }
      return event;
    })
  );
};

// Função auxiliar para verificar se uma string é uma data ISO
const isIsoDateString = (value: any): boolean => {
  return typeof value === 'string' &&
         /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(value);
};

// Função recursiva para converter strings de data em objetos Date
const convertDates = (body: any): any => {
  if (body === null || body === undefined) {
    return body;
  }

  if (Array.isArray(body)) {
    return body.map(item => convertDates(item));
  }

  if (typeof body === 'object') {
    for (const key of Object.keys(body)) {
      const value = body[key];

      if (isIsoDateString(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        convertDates(value);
      }
    }
  }

  return body;
};
