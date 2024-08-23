import { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = import.meta.env.NG_APP_API_BASE_URL;
  const apiReq = req.url.startsWith('http')
    ? req
    : req.clone({
        url: `${apiUrl}/${req.url}`,
      });
  return next(apiReq);
};
