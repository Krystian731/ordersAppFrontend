import {Component, ViewChild} from '@angular/core';
import { LoginComponent} from "./login/login.component";
import { RegisterComponent} from "./register/register.component";
import {Creditentials} from "./models/credentials.model";
import {UserHandlerService} from "../../services/user-handler.service";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {authGuard} from "../../../core/routing/utils/auth.guard";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private users: UserHandlerService) {}

  @ViewChild(LoginComponent) loginComponent: LoginComponent | undefined ;

  checkLoginCreditensials(creditentials: Creditentials) {
    this.users.loginRequest(creditentials).subscribe({
      next: (response: HttpResponse<any>) => {
        const id: number = response.body;
        const token: string | null = response.headers.get('Authorization');
        token === null ? console.error('no auth token !!!') : this.users.login(id, token);
      },
      error: (error) => {
        //console.log(error.error.message);
        this.setPasswordError();
      }
  });
  }

  setPasswordError(){
    this.loginComponent?.signInForm?.get('password')?.setErrors({'incorrect': true});
  }
}
