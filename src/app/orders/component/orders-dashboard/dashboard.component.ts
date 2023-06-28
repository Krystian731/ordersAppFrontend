import {Component, OnInit} from '@angular/core';
import {UserHandlerService} from "../../../login/services/user-handler.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/order";
import {Observable} from "rxjs";
import {DateService} from "../../../shared/services/date.service";
import {AuthService} from "../../../core/auth/auth.service";
import * as moment from 'moment';
import {OrderType} from "../../models/orderType";

@Component({
  selector: 'app-orders',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders$?: Observable<Order[]>;
  $ordersArray?: Observable<Order[][]>;

  // $orderTypes?: Observable<OrderType[]>;
  orderTypes$?: Observable<OrderType[]>;
  display: string = 'day';

  indexTodisplayDetails: number | null = 2;

  toggleValue: any ;

  dateArray: any;
  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService,

              ) {}

  ngOnInit() {
    this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
    this.orderTypes$ = this.orders.orderTypesRequest(this.auth.getUserId());
  }
  logout() {
    this.users.logout();
    this.router.navigateByUrl('/loginPage');
  }
  displayWeek() {
    if( this.display==='week') return;
    this.$ordersArray = undefined;
    this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
    this.display='week';
    this.indexTodisplayDetails = null;
    this.orderTypes$ = this.orders.orderTypesRequest(this.auth.getUserId());
  }
  displayDay() {
    if(this.display==='day') return;
    this.$ordersArray = undefined;
    this.orders$ = this.orders.ordersForDayRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
    this.display='day';
    this.indexTodisplayDetails = null;
    this.orderTypes$ = this.orders.orderTypesRequest(this.auth.getUserId());

  }

  displayCustom(startDate: string, endDate: string) {
    this.dateArray = this.date.getDateRange(startDate, endDate);
    this.$ordersArray= this.orders.ordersForCustomRangeRequest(this.auth.getUserId(), this.dateArray);
    this.orderTypes$ = this.orders.orderTypesRequest(this.auth.getUserId());
  }

  assignIndex(index: number){
    this.indexTodisplayDetails === index ? this.indexTodisplayDetails = null : this.indexTodisplayDetails = index;
  }

  resetOrders() {
    this.display = 'custom';
    this.orders$ = undefined;
  }

}
