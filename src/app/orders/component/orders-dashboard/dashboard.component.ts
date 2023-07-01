import {Component, OnInit} from '@angular/core';
import {UserHandlerService} from "../../../login/services/user-handler.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/order";
import {finalize, map, Observable} from "rxjs";
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

  orders$?: Observable<Order[]>; //TODO tutaj jest blad ze tutaj jest inny typ wlasnie
  // $ordersArray?: Observable<Order[][]>;

  // $orderTypes?: Observable<OrderType[]>;
  orderTypes: OrderType[]=[];
  display: string = 'day';

  indexTodisplayDetails: number | null = 2 ;

  toggleValue: any ;

  dateArray: any;
  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService,

              ) {}

  ngOnInit() {
    this.orders.getOrderTypes(this.auth.getUserId()).subscribe((res) => this.orderTypes = res);
    this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe(
      map(order =>
      {
        let finalArray: Order[] = [];
        order.forEach((order) => {
          const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
          finalArray.push(finalOrder);
        })
        return finalArray;
      })
    );
  }
  logout() {
    this.users.logout();
    this.router.navigateByUrl('/loginPage');
  }
  displayWeek() {
    if( this.display==='week') return;
    console.log('przypisanie:');
    this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe(
      map(order =>
      {
        let finalArray: Order[] = [];
        order.forEach((order) => {
          const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
          finalArray.push(finalOrder);
        })
          return finalArray;
      })
    );
    this.display='week';
    this.indexTodisplayDetails = null;
  }
  displayDay() {
    if(this.display==='day') return;
    this.orders$ = this.orders.ordersForDayRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe(
      map(order =>
      {
        let finalArray: Order[] = [];
        order.forEach((order) => {
          const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
          finalArray.push(finalOrder);
        })
        return finalArray;
      })
    );
    this.display='day';
    this.indexTodisplayDetails = null;
  }

  // displayDayNew(): void {
  //   this.orders$ = this.orders.ordersForDayRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
  //   this.display='day';
  //   this.indexTodisplayDetails = null;
  // }


  displayCustom(startDate: string, endDate: string) {
    this.dateArray = this.date.getDateRange(startDate, endDate);
    this.orders$ = this.orders.ordersForCustomRangeRequest(this.auth.getUserId(), this.dateArray).pipe(
      map(order =>
      {
        let finalArray: Order[] = [];
        order.forEach((order) => {
          const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
          finalArray.push(finalOrder);
        })
        return finalArray;
      })
    );
  }

  assignIndex(index: number){
    this.indexTodisplayDetails === index ? this.indexTodisplayDetails = null : this.indexTodisplayDetails = index;
  }

  resetOrders() {
    this.display = 'custom';
    this.orders$ = undefined;
  }
}
