import {Component, ViewChild} from '@angular/core';
import { LoginComponent} from "../login/login.component";
import { RegisterComponent} from "../register/register.component";
import {Creditentials} from "../../core/models/credentials.model";
import {UserHandlerService} from "../../core/services/user-handler.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private users: UserHandlerService) {}

  @ViewChild(LoginComponent) loginComponent: LoginComponent | undefined ;
  @ViewChild(RegisterComponent) registerComponent: RegisterComponent | undefined ;

  loginTry(creditentials: Creditentials) {
    this.users.loginRequest(creditentials).subscribe({
      next: (response: HttpResponse<any>) => {
        const id: number = response.body;
        const token: string | null = response.headers.get('Authorization');
        token === null ? console.error('no auth token!') : this.users.login(id, token);
      },
      error: (error) => {
        this.setLoginError(error.error.status, error.error.message);
      }
  });
  }

  setLoginError(errorStatus: string, errorMess: string) {
    this.loginComponent ? this.loginComponent.signInForm.get('password')?.setErrors({errorStatus: true}) : null;
    this.loginComponent ? this.loginComponent.serverErrorMess = errorMess : null;
  }

  setRegisterError(errorStatus: string, errorMess: string) {
    this.registerComponent ? this.registerComponent.signUpForm.get('password')?.setErrors({errorStatus: true}) : null;
    this.registerComponent ? this.registerComponent.serverErrorMess = errorMess : null;
  }

  registerTry(creditentials: Creditentials) {
    this.users.registerRequest(creditentials).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('succesfull register');
        console.log(response);
        },
      error: (error) => {
        this.setRegisterError(error.error.status, error.error.error);
        console.log(error);
        }
    })
  }
}
