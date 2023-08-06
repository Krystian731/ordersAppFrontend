import {Component, OnInit, ViewChild} from '@angular/core';
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
import {AddOrderDialogComponent} from "../add-order-dialog/add-order-dialog.component";
import {OrderTypesService} from "../../core/services/order-types.service";

@Component({
  selector: 'app-orders',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders$?: Observable<Order[]>;
  orderTypes: OrderType[]=[];
  display: string = 'day'; //TODO make this type and use predefined aliases, and also change the whole system to use bahaviorsubject, later in angular 17 use signals with effect
  last_displayed: string = '';
  dateArray: string[] = [];

  indexTodisplayDetails: number | null = 2 ; //TODO make it prettier

  toggleValue: any ; //TODO delte this any!
  @ViewChild(AddOrderDialogComponent, {static: true}) addOrderdialogRef!: AddOrderDialogComponent;

  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService,
              private dialog: MatDialog,
              private orderTypesService: OrderTypesService
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
    this.indexTodisplayDetails = null;
  }
  displayDay() {
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
    this.indexTodisplayDetails = null;
  }

  displayCustom(dateArray: string[]) {
    this.orders$ = this.orders.ordersForCustomRangeRequest(this.auth.getUserId(), dateArray).pipe(
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
            this.refreshOrders();
          });
        }

      });
    })

  }
  toogleDisplayState(option: string, date: {start: string, end: string} = {start: "", end: ""}) { //TODO refactor this to work as a subject in serwise i na oninti ustawiam tutaj subscyrbcje
    console.log('funcka');
    if (this.display === option && option != 'custom') {
      console.log('funcka end');
      return;
    }

    switch (option) {
      case 'day': {
        this.display = 'day';
        this.displayDay();
        break;
      }
      case 'week': {
        this.display = 'week';
        this.displayWeek();
        break;
      }
      case 'custom': {
        if (date.start == "" || date.end == "") {
          break;
        }
        this.display = 'custom';
        this.dateArray = this.date.getDateRange(date.start, date.end);
        this.displayCustom(this.dateArray);
        break;
      }
      case 'refresh': {
        switch (this.display) {
          case 'day': {
            this.displayDay();
            break;
          }
          case 'week': {
            this.displayWeek();
            break;
          }
          case 'custom': {
            this.displayCustom(this.dateArray);
            break;
          }
        }
      }
    }
  }
  refreshOrders() {
    this.toogleDisplayState('refresh');
  }

  openAddOrderDialog() {//TODO zmioenic kolejneosc. najpierw otweira sie dialog a pozniej sie typy pobieraja i odaplaja inne subskrybjce
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
