import { Injectable } from '@angular/core';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  getDateRange(startDate: string, endDate: string): string[] {
      if(startDate === '' || endDate === '')
        return [];


      const startDateFormat = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      const endDateFormat = moment(endDate, 'DD/MM/YYYY').add(1,'d').format('YYYY-MM-DD');

      if(moment(startDateFormat,'YYYY-MM-DD').isAfter(moment(endDateFormat,'YYYY-MM-DD'))){
        return [];
      }

      let dateVarFormat= startDateFormat;
      let dateArrayFormat: string[] = [];

      while(dateVarFormat!==endDateFormat) {
        dateArrayFormat.push(dateVarFormat);
        dateVarFormat = moment(dateVarFormat, 'YYYY-MM-DD').add(1,'d').format('YYYY-MM-DD');
      }
      return dateArrayFormat;
    }
   convertControlerDataToJSONFormat(controlerData: string): string {
    return moment(controlerData, 'YYYY-MM-DD').format('YYYY-MM-DDT00:00:00');
   }
   getCurrentDate(): string {
    let date = new Date;
    return date.toISOString();
   }
}
