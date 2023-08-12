import {Component, ViewChild} from '@angular/core';
import { LoginComponent} from "../login/login.component";
import { RegisterComponent} from "../register/register.component";
import {Creditentials} from "../../core/models/credentials.model";
import {UserHandlerService} from "../../core/services/user-handler.service";
import {HttpResponse} from "@angular/common/http";
import {NotificationService} from "../../core/services/notification.service";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private users: UserHandlerService, private notification: NotificationService,  private auth: AuthService, private router: Router,) {}

  @ViewChild(LoginComponent) loginComponent?: LoginComponent ;
  @ViewChild(RegisterComponent) registerComponent?: RegisterComponent ;

  loginTry(creditentials: Creditentials) {
    this.users.loginRequest(creditentials).subscribe({
      next: (response: HttpResponse<any>) => {
        const id: number = response.body;
        const token: string | null = response.headers.get('Authorization');
        token === null ? console.error('no auth token!') : this.loginUser(id, token);
      },
      error: (error) => {
        this.setLoginError(error.error.status, 'złe dane użytkownika!');
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
      next: () => {this.notification.openSnackbar('zarejestrowano!', true)},
      error: (error) => {
        this.setRegisterError(error.error.status, 'nie udało się zarejestrować');
        console.log(error);
        this.notification.openSnackbar('nie zarejestrowano!', false)
        }
    })
  }
  loginUser(id: number, authToken: string){
    this.auth.setUserId(id);
    this.auth.setAuthorizationToken(authToken);
    this.router.navigateByUrl('/orders').then(r => {} );
    this.notification.openSnackbar('zalogowano!', true);
  }
}
