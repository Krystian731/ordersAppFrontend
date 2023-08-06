import { Component } from '@angular/core';
import {OrderState} from "../../core/models/order";
import {OrdersService} from "../../core/services/orders.service";
import {DateService} from "../../shared/services/date.service";

@Component({
  selector: 'app-order-state-console',
  templateUrl: './order-state-console.component.html',
  styleUrls: ['./order-state-console.component.scss']
})
export class OrderStateConsoleComponent {
  public consoleValue: string = 'day';
  constructor(private orderService: OrdersService, private dateService: DateService) {};
  changeState(state: OrderState) {
    this.orderService.changeOrderState(state);
  }
  checkCustomDate(startDate: string, endDate: string) {

    if(startDate == null || endDate == null || startDate == '' || endDate == '') {
      return;
    }
    let dateArray: string[] = this.dateService.getDateRange(startDate, endDate);
    if(dateArray.length != 0) {
      this.orderService.setDateArray(dateArray);
      this.orderService.changeOrderState('custom');
    }
  }
}
