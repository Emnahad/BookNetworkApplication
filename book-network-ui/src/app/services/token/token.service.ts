import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'authToken';

  // Getter for token
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Setter for token
  set token(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
const token = this.token;
if(!token){
  return false;
}
const jwtHelper = new JwtHelperService();
const isTokenExpired= jwtHelper.isTokenExpired(token);
if(isTokenExpired){
  localStorage.clear();
  return false;
}
return true;
  }
}
