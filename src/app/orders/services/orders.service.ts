import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ordersForDayPath, ordersForWeekPath} from "../../shared/environmentals/env";
import {Observable} from "rxjs";
import {Order} from "../models/orderType.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  ordersForWeekRequest(userId: string, timestamp: string): Observable<Order[]> {
    return this.http.get<Order[]>(ordersForWeekPath + userId + '/' + '2023-06-17T00:00:00');
  }

  ordersForDayRequest(userId: string, timestamp: string): Observable<Order[]> {
    return this.http.get<Order[]>(ordersForDayPath + userId + '/' + '2023-06-17T00:00:00');
  }

}