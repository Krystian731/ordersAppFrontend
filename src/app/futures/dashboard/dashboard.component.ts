import {Component, OnInit, ViewChild} from '@angular/core';
import {UserHandlerService} from "../../core/services/user-handler.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../core/services/orders.service";
import {Order, OrderState} from "../../core/models/order";
import {map, Observable} from "rxjs";
import {DateService} from "../../shared/services/date.service";
import {AuthService} from "../../core/services/auth.service";
import {OrderType} from "../../core/models/orderType";
import {EditOrderDialogComponent} from "../edit-order-dialog/edit-order-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddOrderDialogComponent} from "../add-order-dialog/add-order-dialog.component";
import {OrderTypesService} from "../../core/services/order-types.service";

@Component({
  selector: 'app-orders',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public orders$?: Observable<Order[]>;
  currentOrderState: OrderState = 'day';

  indexTodisplayDetails: number | null = 2 ; //TODO make it prettier

  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService,
              private dialog: MatDialog,
              private orderTypesService: OrderTypesService
              ) {}


  ngOnInit() {
    this.orders.getOrderTypes(this.auth.getUserId()).subscribe((newTypes) => this.orderTypesService.setTypes(newTypes));

    this.orders.getOrderState().subscribe((newState) => {
      if(newState === 'refresh')
        this.assignOrders(this.currentOrderState)
      else {
        console.log('doszlo do egzekucji');
        this.assignOrders(newState);
        this.currentOrderState = newState;
      }
    })

    // this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe( //TODO six this typo
    //   map(order =>
    //   {
    //     let finalArray: Order[] = []; //TODO make rxjs reduce here
    //     order.forEach((order) => {
    //       const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
    //       finalArray.push(finalOrder);
    //     })
    //     return finalArray;
    //   })
    // );


  }
  logout() {
    this.users.logout();
    this.router.navigateByUrl('/loginPage');
  }
  // displayWeek() {
  //   this.orders$ = this.orders.ordersForWeekRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe(
  //     map(order =>
  //     {
  //       let finalArray: Order[] = [];//TODO make rxjs reduce here
  //       order.forEach((order) => {
  //         const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
  //         finalArray.push(finalOrder);
  //       })
  //         return finalArray;
  //     })
  //   );
  //   this.indexTodisplayDetails = null; //TODO make function for it
  // }
  // displayDay() {
  //   this.orders$ = this.orders.ordersForDayRequest(this.auth.getUserId(), this.date.getCurrentTimestamp()).pipe(
  //     map(order =>
  //     {
  //       let finalArray: Order[] = []; //TODO make rxjs reduce here
  //       order.forEach((order) => {
  //         const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
  //         finalArray.push(finalOrder);
  //       })
  //       return finalArray;
  //     })
  //   );
  //   this.indexTodisplayDetails = null;
  // }

  // displayCustom(dateArray: string[]) {
  //   this.orders$ = this.orders.ordersForCustomRangeRequest(this.auth.getUserId(), dateArray).pipe(
  //     map(order =>
  //     {
  //       let finalArray: Order[] = [];//TODO make rxjs reduce here
  //       order.forEach((order) => {
  //         const finalOrder: Order = { ...order, name: this.orderTypes[order.orderTypeId-1].name };
  //         finalArray.push(finalOrder);
  //       })
  //       return finalArray;
  //     })
  //   );
  // }

  assignIndex(index: number){
    this.indexTodisplayDetails === index ? this.indexTodisplayDetails = null : this.indexTodisplayDetails = index;
  }

  assignOrders(state: OrderState) {
    switch (state) {
      case "day": {
        this.orders$ = this.orders.getOrdersForDay(this.auth.getUserId());
        break;
      }
      case "week": {
        this.orders$ = this.orders.getOrdersForWeek(this.auth.getUserId());
        break;
      }
      case "custom": {
        console.log(' doszko dow wywlnia switcha');
        this.orders$ = this.orders.getOrdersForRange(this.auth.getUserId(), this.orders.getDateArray())
        console.log(`orders$: ${this.orders$}`);
        break;
      }
    }
  }

  // resetOrders() {
  //   this.display = 'custom';
  //   this.orders$ = undefined; //TODO make this like null or empty observale
  // }
  openEditDialog(order: Order) {
    this.orders.getOrderTypes(this.auth.getUserId()).subscribe((types) => {
      let dialogRef = this.dialog.open(EditOrderDialogComponent, {
          height: '50vh',
          width: '30vw',
          data: {order, types}
        }
      );
      dialogRef.afterClosed().subscribe((result) => {
        if(result !== false) {
          this.orders.updateOrder(result).subscribe( (res) => {
            this.refreshOrders();
          });
        }

      });
    })

  }
  // toogleDisplayState(option: string, date: {start: string, end: string} = {start: "", end: ""}) { //TODO refactor this to work as a subject in serwise i na oninti ustawiam tutaj subscyrbcje
  //   console.log('funcka');
  //   if (this.display === option && option != 'custom') {
  //     console.log('funcka end');
  //     return;
  //   }
  //
  //   switch (option) {
  //     case 'day': {
  //       this.display = 'day';
  //       this.displayDay();
  //       break;
  //     }
  //     case 'week': {
  //       this.display = 'week';
  //       this.displayWeek();
  //       break;
  //     }
  //     case 'custom': {
  //       if (date.start == "" || date.end == "") {
  //         break;
  //       }
  //       this.display = 'custom';
  //       this.dateArray = this.date.getDateRange(date.start, date.end);
  //       this.displayCustom(this.dateArray);
  //       break;
  //     }
  //     case 'refresh': {
  //       switch (this.display) {
  //         case 'day': {
  //           this.displayDay();
  //           break;
  //         }
  //         case 'week': {
  //           this.displayWeek();
  //           break;
  //         }
  //         case 'custom': {
  //           this.displayCustom(this.dateArray);
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }
  refreshOrders() {
    this.orders.changeOrderState('refresh');
  }
  openAddOrderDialog() {
      let addOrderDialog = this.dialog.open(AddOrderDialogComponent, {height: '50vh', width: '30vw'});
      this.orders.getOrderTypes(this.auth.getUserId()).subscribe((types) => {this.orderTypesService.setTypes(types)});

      this.orderTypesService.getNewTypeSubject().subscribe((name) => { //TODO BETER naming, code is not readable
        this.orderTypesService.addNewTypeName(name, this.auth.getUserId()).subscribe((res) => {
          this.orders.getOrderTypes(this.auth.getUserId()).subscribe((newTypes) => {
            this.orderTypesService.setTypes(newTypes);
          })
        })
      });
        this.orderTypesService.getDeleteSubject().subscribe((orderTypeId) => {
          this.orderTypesService.deleteOrderType(this.auth.getUserId(), orderTypeId).subscribe(() => {
            this.orders.getOrderTypes(this.auth.getUserId()).subscribe((newTypes) => {
              this.orderTypesService.setTypes(newTypes);
            });
          })
        });

        addOrderDialog.afterClosed().subscribe((result) => {
          if(result !== false) {
            let newOrder: Order = {...result, orderId: 0, userId: this.auth.getUserId()};
            this.orders.addOrder(newOrder).subscribe( (res) => {
              this.refreshOrders();
            },
              (error) => {
              console.error('cos poszlo nie tak');
              });
          }

        });

  }
}
