import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
getCurrentTimestamp() {
  const currentDate = new Date();
  const timestamp = currentDate.toISOString().split('.')[0];
  console.log(timestamp);
  return timestamp;
}
  constructor() { }
}
