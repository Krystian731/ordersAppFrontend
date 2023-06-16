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

  @Output() loginEvent = new EventEmitter<Creditentials>();

   serverErrorMess?: string;
  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      //TODO napisac swoj wlasny validator tutaj
      asyncValidators: [],
      updateOn: 'submit'}),
    password: new FormControl('',
      {validators: [ Validators.required, Validators.maxLength(20)],
      asyncValidators: [],
        updateOn: 'submit'})
  });

  loginRequest(username: string, password: string ) {
    if(this.signInForm.invalid) return;

    const credentials: Creditentials = {username, password}
    this.loginEvent.emit(credentials);
  }
}
