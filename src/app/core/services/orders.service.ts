import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ordersForDayPath, ordersForWeekPath, ordersPath, orderTypesPath} from "../../shared/environmentals/paths";
import {forkJoin, map, Observable, Subject} from "rxjs";
import {Order, OrderState} from "../models/order";
import {OrderType} from "../models/orderType";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersStateSubject = new Subject<OrderState>();

  constructor(private http: HttpClient) { }

  ordersForWeekRequest(userId: string, timestamp: string): Observable<Order[]> {
    return this.http.get<Order[]>(ordersForWeekPath + userId + '/2023-06-17T00:00:00');
  }

  ordersForDayRequest(userId: string, timestamp: string): Observable<Order[]> {
    return this.http.get<Order[]>(ordersForDayPath + userId + '/2023-06-17T00:00:00'); //TODO do it as current day
  }

  ordersForCustomRangeRequest(userId: string, range: string[]): Observable<Order[]> {
    let requests: Observable<Order[]>[] = [];
    for (let day of range) {
      const url = ordersForDayPath + userId + '/' + day + 'T00:00:00';
      requests.push(this.http.get<Order[]>(url));
    }
    return forkJoin(requests)
      .pipe(
      map(arr => arr.reduce((acc, val) => acc.concat(val), []))
    );
  }

  ordersForCustomRangeRequest2(userId: string, range: string[]): Observable<Order[][]> {
    let requests: Observable<Order[]>[] = [];
    for (let day of range) {
      const url = ordersForDayPath + userId + '/' + day + 'T00:00:00';
      requests.push(this.http.get<Order[]>(url));
    }
    return forkJoin(requests);
  }

  getOrderTypes(userId: string): Observable<OrderType[]> { //TODO przeniesc te fucnkje do inneog serwisu
    return this.http.get<OrderType[]>(orderTypesPath + userId);
  }

  updateOrder(updatedOrder: Order) {
    return this.http.patch(ordersPath + updatedOrder.orderId, updatedOrder);
  }
  addOrder(newOrder: Order) {
    return this.http.post(ordersPath, newOrder);
  }
}
