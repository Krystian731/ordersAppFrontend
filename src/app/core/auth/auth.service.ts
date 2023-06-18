import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookies: CookieService) { }
  isUserIdSet(): boolean {
  return this.cookies.check('userId'); // czy tutaj nie powiniem sprawdzic token JWT i czy jest prawidlowy?
  }
  setUsername(username: string): void {
    this.cookies.set('username', username);
  }

  setUserId(id: number): void  {
    this.cookies.set('userId',  id.toString());
  }

  setAuthorizationToken(token: string) {
    this.cookies.set('authorizationToken', token);
  }

  deleteAuthorizationToken() {
    this.cookies.delete('authorizationToken');
  }
  deleteUserId() {
    this.cookies.delete('userId');
  }
  getAuthorizationToken(): string {
    return this.cookies.get('authorizationToken');
  }
  getUserId(): string {
    return this.cookies.get('userId');
  }
}
