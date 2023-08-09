import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ordersForDayPath, ordersForWeekPath, ordersPath} from "../../shared/environmentals/paths";
import {BehaviorSubject, distinctUntilChanged, forkJoin, map, Observable} from "rxjs";
import {Order, OrderState} from "../models/order";
import {OrderTypesService} from "./order-types.service";
import {DateService} from "../../shared/services/date.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersStateSubject = new BehaviorSubject<OrderState>('day');
  public dateArray: string[] = [];

  constructor(private http: HttpClient, private orderTypesService: OrderTypesService, private dateService: DateService) { }
  updateOrder(updatedOrder: Order): Observable<Object> {
    return this.http.patch(ordersPath + updatedOrder.orderId, updatedOrder);
  }
  addOrder(newOrder: Order): Observable<Object> {
    return this.http.post(ordersPath, newOrder);
  }
  changeOrderState(state: OrderState) {
    this.ordersStateSubject.next(state);
  }
  getOrderState(): Observable<OrderState> {
    return this.ordersStateSubject.asObservable();
  }
  setDateArray(dateArray: string[]) {
    this.dateArray = dateArray;
  }
  getDateArray(): string[] {
    return this.dateArray;
  }
  getOrdersForDay(userId: string): Observable<Order[]> {
     return this.http.get<Order[]>(ordersForDayPath + userId + '/'+ this.dateService.getCurrentDate()).pipe(
       map((orders: Order[]) =>
         orders.map(order => ({
           ...order,
           name:
           this.orderTypesService.getOrderTypeNameById(order.orderTypeId)
         }))
       )
     );
  }

  getOrdersForWeek(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(ordersForWeekPath + userId + '/' + this.dateService.getCurrentDate()).pipe(
      map((orders: Order[]) =>
        orders.map(order => ({
          ...order,
          name: this.orderTypesService.getOrderTypeNameById(order.orderTypeId)
        }))
      )
    );
  }
  getOrdersForRange(userId: string, range: string[]): Observable<Order[]> {
    let requests: Observable<Order[]>[] = [];
    for (let day of range) {
      requests.push(this.http.get<Order[]>(ordersForDayPath + userId + '/' + day + 'T00:00:00').pipe(
        map((orders: Order[]) =>
          orders.map(order => ({
            ...order,
            name: this.orderTypesService.getOrderTypeNameById(order.orderTypeId)
          }))
        )
      ));
    }
    return forkJoin(requests)
      .pipe(
        map(arr => arr.reduce((acc, val) => acc.concat(val), []))
      );
  }
  deleteOrder(orderId: string) {
    return this.http.delete(ordersPath + orderId);
  }
}
