import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ordersForDayPath, ordersForWeekPath, ordersPath, orderTypesPath} from "../../shared/environmentals/paths";
import {forkJoin, map, Observable} from "rxjs";
import {Order} from "../models/order";
import {OrderType} from "../models/orderType";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  ordersForWeekRequest(userId: string, timestamp: string): Observable<Order[]> {
    console.log('orderforweekrequest');
    return this.http.get<Order[]>(ordersForWeekPath + userId + '/2023-06-17T00:00:00');
  }

  ordersForDayRequest(userId: string, timestamp: string): Observable<Order[]> {
    console.log('displaydayw!!!!!');
    return this.http.get<Order[]>(ordersForDayPath + userId + '/2023-06-17T00:00:00');
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
    //tutaj pipe z reduce
  }

  ordersForCustomRangeRequest2(userId: string, range: string[]): Observable<Order[][]> {
    let requests: Observable<Order[]>[] = [];
    for (let day of range) {
      const url = ordersForDayPath + userId + '/' + day + 'T00:00:00';
      requests.push(this.http.get<Order[]>(url));
    }
    return forkJoin(requests);
  }

  getOrderTypes(userId: string): Observable<OrderType[]> {
    return this.http.get<OrderType[]>(orderTypesPath + userId);
  }

  updateOrder(updatedOrder: Order) {
    console.log(`wartość updatedOrder w serwisie przed wsyłaniem: ${updatedOrder.plannedCompletionDate}`)
    return this.http.patch(ordersPath + updatedOrder.orderId, updatedOrder);
  }
}