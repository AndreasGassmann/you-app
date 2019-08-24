import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://you-backend.herokuapp.com';

  constructor(private readonly http: HttpClient) {}

  registerPushToken(address: string, pushToken: string) {
    console.log('API: registering push token', address, pushToken);
    if (address && pushToken) {
      console.log(
        'inside if, sending request',
        `${this.baseUrl}/push/register`
      );
      return this.http
        .post(
          `${this.baseUrl}/push/register`,
          {
            address,
            pushToken
          },
          { responseType: 'text' }
        )
        .toPromise()
        .catch(error => console.error('API', error));
    }
  }

  sendLoginResponse(uuid: string, username: string, password: string) {
    console.log('Sending login response', arguments);
    return this.http
      .post(
        `${this.baseUrl}/login/response`,
        {
          uuid,
          username,
          password
        },
        { responseType: 'text' }
      )
      .toPromise()
      .catch(error => console.error('API', error));
  }
}
