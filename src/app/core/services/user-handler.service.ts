import { Injectable } from '@angular/core';
import {Creditentials} from "../models/credentials.model";
import {HttpClient} from "@angular/common/http";
import {loginPath, registerPath} from "../../shared/environmentals/paths";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
//TODO i tutaj sobie robie zapytanie do bazy o zalogowanie chłopa mja c username no i to oczywiscie returnuje observable
  //TODO dobrqa czyli z partyzanta robie zapytanie do bazy i jak jest zle to przekazuje errora do materror a jak nie to loguje itp
  constructor(private http: HttpClient, private auth: AuthService, private router: Router, private notification: NotificationService) { }

  loginRequest(creditentials: Creditentials) { //TODO implement here the returned type
    return this.http.post(loginPath, creditentials, { observe: 'response' });
  }

  login(id: number, authToken: string){
    // czyli wywolanie setcookies i routernavigate
    this.auth.setUserId(id);
    this.auth.setAuthorizationToken(authToken);
    this.router.navigateByUrl('/orders').then(r => {} );
    this.notification.openSnackbar('zalogowano!', true);
  }

  registerRequest(creditentials: Creditentials) {
    return this.http.post(registerPath, creditentials, { observe: 'response' }  )
  }

  logout() {
    this.auth.deleteUserId();
    this.auth.deleteAuthorizationToken();
  }
}
