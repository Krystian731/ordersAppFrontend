import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators: [],
      updateOn: 'submit' }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4)],
      asyncValidators: [],
      updateOn: "submit" })
  });
}
