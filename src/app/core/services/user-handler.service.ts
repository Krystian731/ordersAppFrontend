import { Injectable } from '@angular/core';
import {Creditentials} from "../models/credentials.model";
import {HttpClient} from "@angular/common/http";
import {loginPath, registerPath} from "../../shared/environmentals/paths";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "./notification.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router, private notification: NotificationService) { }

  loginRequest(creditentials: Creditentials) {
    return this.http.post(loginPath, creditentials, { observe: 'response' });
  }



  registerRequest(creditentials: Creditentials) {
    return this.http.post(registerPath, creditentials, { observe: 'response' }  )
  }

  logout() {
    this.auth.deleteUserId();
    this.auth.deleteAuthorizationToken();
  }
}
