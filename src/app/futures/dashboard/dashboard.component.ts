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
import {appearFromLeft, staggerEffect} from "../../shared/utils/animations";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-orders',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [appearFromLeft, staggerEffect]
})
export class DashboardComponent implements OnInit {

  public orders$?: Observable<Order[]>;
  currentOrderState: OrderState = 'day';

  toDisplayDetails: number | null = null;

  constructor(private users: UserHandlerService,
              private router: Router,
              private orders: OrdersService,
              private date: DateService,
              private auth: AuthService,
              private dialog: MatDialog,
              private orderTypesService: OrderTypesService,
              private notificationService : NotificationService
              ) {}

  ngOnInit() {
    this.orderTypesService.getOrderTypesRequest(this.auth.getUserId()).subscribe((newTypes) => this.orderTypesService.setOrderTypes(newTypes));

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
    this.notificationService.openSnackbar('wylogowano!',true)
  }

  assignIndex(index: number){
    this.toDisplayDetails === index ? this.toDisplayDetails = null : this.toDisplayDetails = index;
  }

  openEditDialog(order: Order) {
    this.orderTypesService.getOrderTypesRequest(this.auth.getUserId()).subscribe((types) => {
      let dialogRef = this.dialog.open(EditOrderDialogComponent, {
          height: '800px',
          width: '450px',
          data: {order, types}
        }
      );
      dialogRef.afterClosed().subscribe((result) => {
          if(result === false) return;
          this.orders.updateOrder(result).subscribe( () => {
            this.refreshOrders();
            this.notificationService.openSnackbar('pomyślnie zmieniono zamówienie!', true);

          },
            (error) => {
              this.notificationService.openSnackbar('nie udało się zmienić zamówienia!', false);

              console.error(error.error)
            });
      });
    })
  }

  refreshOrders() {
    this.orders.changeOrderState('refresh');
  }
  openAddOrderDialog() {
      let addOrderDialog = this.dialog.open(AddOrderDialogComponent, { height: '800px', width: '450px'});
      this.orderTypesService.getOrderTypesRequest(this.auth.getUserId()).subscribe((newTypes) => {this.orderTypesService.setOrderTypes(newTypes)});

      this.orderTypesService.getNewOrderTypeSubject().subscribe((name) => {
        this.orderTypesService.addNewOrderTypeName(name, this.auth.getUserId()).subscribe(() => {
            this.notificationService.openSnackbar('dodano nowy typ!', true);
            this.orderTypesService.getOrderTypesRequest(this.auth.getUserId()).subscribe((newTypes) => {
            this.orderTypesService.setOrderTypes(newTypes);
          })
        },
          (error) => {
            this.notificationService.openSnackbar('nie udało się dodać typu!', false);
            console.error(error.error);
          })
      });
        this.orderTypesService.getDeleteOrderSubject().subscribe((orderTypeId) => {
          this.orderTypesService.deleteOrderType(this.auth.getUserId(), orderTypeId).subscribe(() => {
              this.notificationService.openSnackbar('usunięto typ!', true);
            this.orderTypesService.getOrderTypesRequest(this.auth.getUserId()).subscribe((newTypes) => {
              this.orderTypesService.setOrderTypes(newTypes);
            });
          },
            (error) => {
              this.notificationService.openSnackbar('nie udało się usunąć typu!', false);
              console.error(error.error);
            })
        });
        addOrderDialog.afterClosed().subscribe((result) => {
          if(result !== false) {
            let newOrder: Order = {...result, orderId: 0, userId: this.auth.getUserId()};
            this.orders.addOrder(newOrder).subscribe( () => {
              this.refreshOrders();
                this.notificationService.openSnackbar('dodano nowe zamówienie!', true);

              },
              (error) => {
                this.notificationService.openSnackbar('nie udało się dodać zamówienia!', false);
                console.error(error.error);
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
