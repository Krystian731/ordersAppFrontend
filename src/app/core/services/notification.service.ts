import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }
  openSnackbar(message: string, state: boolean) {
    if(state)
      this._snackBar.open(message, '', { duration: 2000, panelClass: ['green-snackbar']})
    else
      this._snackBar.open(message, '', { duration: 2000, panelClass: ['red-snackbar']})


  }
}
