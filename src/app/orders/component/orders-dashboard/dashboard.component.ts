import {Component, OnInit} from '@angular/core';
import {UserHandlerService} from "../../../login/services/user-handler.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/orderType.model";
import {Observable} from "rxjs";
import {DateService} from "../../../shared/services/date.service";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-orders',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  $orders?: Observable<Order[]>;

  display: string = 'day';
  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService) {}

  ngOnInit() { //TODO make date function
    this.$orders = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
  }
  logout() {
    this.users.logout();
    this.router.navigateByUrl('/loginPage');
  }
  displayWeek() {
    if( this.display==='week') return;
    this.$orders = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
    this.display='week';


  }
  displayDay() {
    if(this.display==='day') return;
    this.$orders = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp());
    this.display='day';
  }

}
