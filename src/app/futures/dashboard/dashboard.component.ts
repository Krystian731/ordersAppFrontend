import {Component, OnInit} from '@angular/core';
import {UserHandlerService} from "../../core/services/user-handler.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../core/services/orders.service";
import {Order} from "../../core/models/order";
import {map, Observable} from "rxjs";
import {DateService} from "../../shared/services/date.service";
import {AuthService} from "../../core/services/auth.service";
import {OrderType} from "../../core/models/orderType";
import {EditOrderDialogComponent} from "../edit-order-dialog/edit-order-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-orders',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders$?: Observable<Order[]>;
  orderTypes: OrderType[]=[];
  display: string = 'day'; //TODO make this type and use predefined aliases, and also change the whole system to use bahaviorsubject, later in angular 17 use signals with effect

  indexTodisplayDetails: number | null = 2 ; //TODO make it prettier

  toggleValue: any ; //TODO delte this any!

  dateArray: any;
  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService,
              private dialog: MatDialog
              ) {}

  ngOnInit() {
    this.orders.getOrderTypes(this.auth.getUserId()).subscribe((res) => this.orderTypes = res); //TODO maybe make use of signals here?

    this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe( //TODO six this typo
      map(order =>
      {
        let finalArray: Order[] = []; //TODO make rxjs reduce here
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
        let finalArray: Order[] = [];//TODO make rxjs reduce here
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
        let finalArray: Order[] = []; //TODO make rxjs reduce here
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

  displayCustom(startDate: string, endDate: string) {
    if(startDate == null || endDate == null) {
      console.log('guardclose daterange');
      return;
    }
    this.dateArray = this.date.getDateRange(startDate, endDate);
    this.orders$ = this.orders.ordersForCustomRangeRequest(this.auth.getUserId(), this.dateArray).pipe(
      map(order =>
      {
        let finalArray: Order[] = [];//TODO make rxjs reduce here
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
    this.orders$ = undefined; //TODO make this like null or empty observale
  }
  openEditDialog(order: Order, index: number) {
//tutaj najpierw robie request na typy dla usera a pozniej binduje te typy do dialogu
    //TODO get the request for types and then subscribe to it.
    // nie no i pozniej jak tu zmienie to sie odpala change detection i wszytsko na nowo powinno sie wczytac. takze tylko decyduje co zrobic po zamknieciu dialglou
    this.orders.getOrderTypes(this.auth.getUserId()).subscribe((types) => {
      // i teraz tutaj wywoluje otwarcie dialogu ze zbindowanymi typami
      let dialogRef = this.dialog.open(EditOrderDialogComponent, {
          height: '50vh',
          width: '30vw',
          data: {order, types}
         // tutaj trzeba drg dac
        },
      );
      // teraz after dialogowy handling

      dialogRef.afterClosed().subscribe((result) => {
        if(result !== false) {
          this.orders.updateOrder(result).subscribe( (res) => {
            console.log(res);
          });
          // dobra i to musze subskrybowac
          console.log('poslzo');
        }

      });
    })

  }
}
