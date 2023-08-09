import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Output, EventEmitter } from '@angular/core';
import {Creditentials} from "../../core/models/credentials.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() onLogin: EventEmitter<Creditentials> = new EventEmitter<Creditentials>();

   serverErrorMess?: string;
  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      asyncValidators: [],
      updateOn: 'blur'}),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.maxLength(20)],
      asyncValidators: [],
      updateOn: 'blur'})
  });

  submitLogin() {
    if(this.signInForm.invalid) return;
    const credentials: Creditentials = this.signInForm.value;
    this.onLogin.emit(credentials);
  }
}
