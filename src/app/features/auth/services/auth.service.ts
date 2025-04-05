import { Observable, tap,of } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { SuccessfulResponse } from '@core/api/models'
import { ApiService } from '@core/api/services/api.service'
import { TokenService } from '@core/token/services/token.service'
import { TokenDto } from '@core/token/models'
import { AccountDto, CredentialDto } from '../models'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenService = inject(TokenService)
  private readonly api = inject(ApiService)
 // ACTIVAR PARA LOGIN TOKEN 
  login(credentials: CredentialDto): Observable<SuccessfulResponse<TokenDto>> {
    return this.api.post<TokenDto>('shared/authentication', credentials).pipe(
      tap(({ data }) => this.tokenService.setToken(data.token))
    )
  }

  // login(credentials: CredentialDto): Observable<SuccessfulResponse<TokenDto>> {
  //   const fakeResponse: SuccessfulResponse<TokenDto> = {
  //     data: { 
  //       token: 'mocked-jwt-token', 
  //       expiration: new Date(Date.now() + 3600 * 1000).toISOString()
  //     },
  //     httpStatusCode: 200,
  //     isSuccess: true,
  //     messages: [{ code: 'MOCK', description: 'Login simulado exitoso' }]
  //   };
  
  //   this.tokenService.setToken(fakeResponse.data.token); 
  
  //   return of(fakeResponse); 
  // }
  // getAccountSession(): Observable<SuccessfulResponse<AccountDto>> {  
  //   return this.api.get<AccountDto>('shared/accounts/GetAccountSession')
  // }
}
