import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {OrderType} from "../models/orderType";
import {orderTypesPath} from "../../shared/environmentals/paths";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderTypesService {
  private newTypeName$ = new Subject<string>();
  private deleteTypeSubject$ = new Subject<number>();
  public types: OrderType[] = [];
  constructor(private http: HttpClient) { }
  getOrderTypesRequest(userId: string): Observable<OrderType[]> {
    return this.http.get<OrderType[]>(orderTypesPath + userId);
  }
  emitNewTypeName(name: string) {

    this.newTypeName$.next(name);
  }
  getNewOrderTypeSubject(): Observable<string> {
    return this.newTypeName$.asObservable();
  }
  addNewOrderTypeName(name: string, userId: string): Observable<object> {
    return this.http.post(orderTypesPath, {name: name, userId: userId});
  }
  deleteOrderType(userId: string, oderTypeId: number): Observable<object> {
    return this.http.delete(`${orderTypesPath}${userId}/${oderTypeId}`);
  }
  setOrderTypes(types: OrderType[]) {
    this.types = types;
  }
  getOrderTypes(): OrderType[] {
    return this.types;
  }
  emitDeleteType(orderTypeId: number) {
    this.deleteTypeSubject$.next(orderTypeId);
  }
  getDeleteOrderSubject(): Observable<number> {
    return this.deleteTypeSubject$.asObservable();// try this without asobservable
  }
  getOrderTypeNameById(orderTypeId: number) {
    for(let type of this.types) {
      if(type.orderTypeId === orderTypeId) {
        return type.name;
      }
    }
    return 'nieprzypisany';
  }
  getOrderTypeNameByIndex(indexInTheArray: number) {
    return this.types[indexInTheArray].name;
  }
  getOrderTypeIdByIndex(indexInTheArray: number) {
    return this.types[indexInTheArray].orderTypeId;
  }


}
