import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Output, EventEmitter } from '@angular/core';
import {Creditentials} from "../models/credentials.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() onLogin = new EventEmitter<Creditentials>();

   serverErrorMess?: string;
  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      //TODO napisac swoj wlasny validator tutaj
      asyncValidators: [],
      updateOn: 'blur'}),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.maxLength(20)],
      asyncValidators: [],
      updateOn: 'blur'})
  });

  submitLogin() {
    // musze jakas wyczaic tatkiego clause zeby moc uruchomic to w templatce. no w sumie to mi zwraca zawsze jedne obiekt wiec
    // wiec wsm to moge zrobic clasue na obiekt taki i pierdolnosc wtedy
    //console.log( Object.keys(this.signInForm.get('password').errors));
    if(this.signInForm.invalid) return;
    console.log('login2');

    const credentials: Creditentials = this.signInForm.value;
    this.onLogin.emit(credentials);
  }
}
