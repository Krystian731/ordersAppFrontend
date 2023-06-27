import { Injectable } from '@angular/core';
import {coerceStringArray} from "@angular/cdk/coercion";
import {join} from "@angular/compiler-cli";
import * as moment from 'moment';
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

  getDateRange(startDate: string, endDate: string): string[] {
      if(startDate === '' || endDate === '')
        return [];

      const startDateFormat = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      const endDateFormat = moment(endDate, 'DD/MM/YYYY').add(1,'d').format('YYYY-MM-DD');
      let dateVarFormat= startDateFormat;
      let dateArrayFormat: string[] = [];

      while(dateVarFormat!==endDateFormat) {
        dateArrayFormat.push(dateVarFormat);
        dateVarFormat = moment(dateVarFormat, 'YYYY-MM-DD').add(1,'d').format('YYYY-MM-DD');
      }
      console.log(`dateArrayFormated: ${dateArrayFormat}`);
      return dateArrayFormat;
    }


  constructor() { }
}
