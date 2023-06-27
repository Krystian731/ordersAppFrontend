import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ordersForDayPath, ordersForWeekPath} from "../../shared/environmentals/env";
import {forkJoin, map, mergeMap, Observable, toArray} from "rxjs";
import {Order} from "../models/orderType.model";
import * as moment from 'moment';

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
  ordersForCustomRangeRequest(userId: string, range: string[]): Observable<Order[][]> {
    let requests: Observable<Order[]>[] = [];
    for (let day of range) {
      const url = ordersForDayPath + userId + '/' + day + 'T00:00:00';
      requests.push(this.http.get<Order[]>(url));
    }
    return forkJoin(requests);
  }

  // to powinno funkcjonowac w ten sposob ze czeka az wsyztskie requesty i laczy to w jeden.
  // no tak tylko laczy te wszytskie requesty ktore zwaraacja observale<order[]> i teraz jest tablice tego typu.

}
