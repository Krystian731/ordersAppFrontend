import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      //TODO napisac swoj wlasny validator tutaj
      asyncValidators: [],
      updateOn: 'submit'}),
    password: new FormControl('',
      {validators: [ Validators.required, Validators.maxLength(20)]})
  });
}
