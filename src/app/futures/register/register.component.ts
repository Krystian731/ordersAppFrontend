import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Creditentials} from "../../core/models/credentials.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() registerEvent: EventEmitter<Creditentials> = new EventEmitter<Creditentials>();


  serverErrorMess?: string;
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

  registerRequest(username: string, password: string) {
    if(this.signUpForm.invalid) return;

    const credentials: Creditentials = {username, password}
    this.registerEvent.emit(credentials);
  }
}
