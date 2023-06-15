import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookies: CookieService) { }
  isUsernameSet(): boolean {
  return this.cookies.check('username'); // czy tutaj nie powiniem sprawdzic token JWT i czy jest prawidlowy?
  }
  setUsername(username: string): void {
    this.cookies.set('username', username);
  }

}
