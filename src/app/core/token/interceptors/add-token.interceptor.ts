import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenService } from '../services/token.service'

// export const addTokenInterceptor: HttpInterceptorFn = (req, next, tokenService = inject(TokenService)) => {
//   let modifiedReq = req.clone({
//     headers: req.headers
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/json')
//       .set('Cache-Control', 'no-cache')
//       .set('Pragma', 'no-cache')
//       .set('Expires', '0'),
//   })
//   if (tokenService.tokenExists()) {
//     modifiedReq = modifiedReq.clone({
//       headers: modifiedReq.headers.set('Authorization', `Bearer ${tokenService.getToken()}`),
//     })
//   }

//   return next(modifiedReq)
// }
export const addTokenInterceptor: HttpInterceptorFn = (req, next, tokenService = inject(TokenService)) => {
  // Si el body es FormData, no forzamos el Content-Type
  if (req.body instanceof FormData) {
    let modifiedReq = req.clone({
      headers: req.headers
        .set('Accept', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', '0'),
    });
    if (tokenService.tokenExists()) {
      modifiedReq = modifiedReq.clone({
        headers: modifiedReq.headers.set('Authorization', `Bearer ${tokenService.getToken()}`),
      });
    }
    return next(modifiedReq);
  }

  // Para peticiones que no son FormData, establecemos Content-Type a application/json
  let modifiedReq = req.clone({
    headers: req.headers
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', '0'),
  });
  if (tokenService.tokenExists()) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', `Bearer ${tokenService.getToken()}`),
    });
  }
  return next(modifiedReq);
};
