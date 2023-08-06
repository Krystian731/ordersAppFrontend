import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ordersForDayPath, ordersForWeekPath, ordersPath, orderTypesPath} from "../../shared/environmentals/paths";
import {BehaviorSubject, distinctUntilChanged, forkJoin, map, Observable} from "rxjs";
import {Order, OrderState} from "../models/order";
import {OrderType} from "../models/orderType";
import {OrderTypesService} from "./order-types.service";
import {DateService} from "../../shared/services/date.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersStateSubject = new BehaviorSubject<OrderState>('day');
  public dateArray: string[] = [];

  constructor(private http: HttpClient, private orderTypesService: OrderTypesService, private dateService: DateService) { }

  getOrderTypes(userId: string): Observable<OrderType[]> { //TODO przeniesc te fucnkje do inneog serwisu
    return this.http.get<OrderType[]>(orderTypesPath + userId);
  }

  updateOrder(updatedOrder: Order): Observable<Object> { //TODO check this type ?? object?
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
    console.log(`assigmnet dateArray po datepciker: ${this.dateArray}`);
  }
  getDateArray(): string[] {
    console.log(`wywowalnie getter dateArray, zwraca: ${this.dateArray} `);
    return this.dateArray;
  }
  getOrdersForDay(userId: string) {
     return this.http.get<Order[]>(ordersForDayPath + userId + '/'+ this.dateService.getCurrentDate()).pipe( // make sure the date is corretct here
      map(order =>
      {
        let finalArray: Order[] = []; //TODO make rxjs reduce here
        order.forEach((order) => {
          const finalOrder: Order = { ...order, name: this.orderTypesService.types[order.orderTypeId-1].name };
          finalArray.push(finalOrder);
        })
        return finalArray;
      })
    );
  }

  getOrdersForWeek(userId: string) {
    return this.http.get<Order[]>(ordersForWeekPath + userId + '/' + this.dateService.getCurrentDate()).pipe( // make sure the date is corretct here
      map(order =>
      {
        let finalArray: Order[] = []; //TODO make rxjs reduce here
        order.forEach((order) => {
          const finalOrder: Order = { ...order, name: this.orderTypesService.types[order.orderTypeId-1].name };
          finalArray.push(finalOrder);
        })
        return finalArray;
      })
    );
  }
  getOrdersForRange(userId: string, range: string[]) {
    let requests: Observable<Order[]>[] = [];
    for (let day of range) {
      const url = ordersForDayPath + userId + '/' + day + 'T00:00:00'; //TODO make rxjs reduce here
      requests.push(this.http.get<Order[]>(url));
    }
    return forkJoin(requests)
      .pipe(
        map(arr => arr.reduce((acc, val) => acc.concat(val), []))
      );
  }
}
