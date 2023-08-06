import {Component, OnInit} from '@angular/core';
import {UserHandlerService} from "../../core/services/user-handler.service";
import {Router} from "@angular/router";
import {OrdersService} from "../../core/services/orders.service";
import {Order, OrderState} from "../../core/models/order";
import {Observable} from "rxjs";
import {DateService} from "../../shared/services/date.service";
import {AuthService} from "../../core/services/auth.service";
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
    this.orderTypesService.getOrderTypes(this.auth.getUserId()).subscribe((newTypes) => this.orderTypesService.setTypes(newTypes));

    this.orders.getOrderState().subscribe((newState) => {
      if(newState === 'refresh')
        this.assignOrders(this.currentOrderState)
      else {
        this.assignOrders(newState);
        this.currentOrderState = newState;
      }
    })
  }
  logout() {
    this.users.logout();
    this.router.navigateByUrl('/loginPage');
  }

  assignIndex(index: number){
    this.indexTodisplayDetails === index ? this.indexTodisplayDetails = null : this.indexTodisplayDetails = index;
  }

  openEditDialog(order: Order) {
    this.orderTypesService.getOrderTypes(this.auth.getUserId()).subscribe((types) => {
      let dialogRef = this.dialog.open(EditOrderDialogComponent, {
          height: '50vh',
          width: '30vw',
          data: {order, types}
        }
      );
      dialogRef.afterClosed().subscribe((result) => {
        if(result !== false) {
          this.orders.updateOrder(result).subscribe( () => {
            this.refreshOrders();
          });
        }
      });
    })
  }

  refreshOrders() {
    this.orders.changeOrderState('refresh');
  }
  openAddOrderDialog() {
      let addOrderDialog = this.dialog.open(AddOrderDialogComponent, {height: '50vh', width: '30vw'});
      this.orderTypesService.getOrderTypes(this.auth.getUserId()).subscribe((types) => {this.orderTypesService.setTypes(types)});

      this.orderTypesService.getNewTypeSubject().subscribe((name) => { //TODO BETER naming, code is not readable
        this.orderTypesService.addNewTypeName(name, this.auth.getUserId()).subscribe(() => {
          this.orderTypesService.getOrderTypes(this.auth.getUserId()).subscribe((newTypes) => {
            this.orderTypesService.setTypes(newTypes);
          })
        })
      });
        this.orderTypesService.getDeleteSubject().subscribe((orderTypeId) => {
          this.orderTypesService.deleteOrderType(this.auth.getUserId(), orderTypeId).subscribe(() => {
            this.orderTypesService.getOrderTypes(this.auth.getUserId()).subscribe((newTypes) => {
              this.orderTypesService.setTypes(newTypes);
            });
          })
        });
        addOrderDialog.afterClosed().subscribe((result) => {
          if(result !== false) {
            let newOrder: Order = {...result, orderId: 0, userId: this.auth.getUserId()};
            this.orders.addOrder(newOrder).subscribe( () => {
              this.refreshOrders();
            },
              () => {
              console.error('cos poszlo nie tak');
              });
          }
        });
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
        this.orders$ = this.orders.getOrdersForRange(this.auth.getUserId(), this.orders.getDateArray())
        break;
      }
    }
  }
}
