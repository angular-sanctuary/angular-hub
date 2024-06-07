import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { REQUEST } from '../../../request-response';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const ssrRequest = inject(REQUEST, { optional: true });
  const cookieHeader = ssrRequest?.headers?.['cookie'];
  const newRequest = req.clone(
    cookieHeader ? { setHeaders: { cookie: cookieHeader } } : {},
  );
  return next(newRequest);
};
