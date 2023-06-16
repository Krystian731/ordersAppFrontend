import { Injectable } from '@angular/core';
import {Creditentials} from "../components/login-page/models/credentials.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {loginPath} from "../../shared/environmentals/env";
import {Observable} from "rxjs";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
//TODO i tutaj sobie robie zapytanie do bazy o zalogowanie chłopa mja c username no i to oczywiscie returnuje observable
  //TODO dobrqa czyli z partyzanta robie zapytanie do bazy i jak jest zle to przekazuje errora do materror a jak nie to loguje itp
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  loginRequest(creditentials: Creditentials) { //TODO implement here the returned type
    return this.http.post(loginPath, creditentials, { observe: 'response' });
  }

  login(id: number, authToken: string){
    // czyli wywolanie setcookies i routernavigate
    this.auth.setUserId(id);
    this.auth.setAuthorizationToken(authToken);
    this.router.navigateByUrl('/orders').then(r => {} );
  }
}