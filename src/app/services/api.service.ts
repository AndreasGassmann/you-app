import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  registerPushToken(address: string, pushToken: string) {
    return this.http.post(`${this.baseUrl}/push/register`, {
      address,
      pushToken
    });
  }

  sendLoginResponse(encryptedPassword: string, recipient: string) {
    return this.http.post(`${this.baseUrl}/login-response`, {
      encryptedPassword,
      recipient
    });
  }
}
