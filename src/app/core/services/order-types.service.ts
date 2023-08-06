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
  private types: OrderType[] = [];
  constructor(private http: HttpClient) { }
  emitNewTypeName(name: string) {
    this.newTypeName$.next(name);
  }
  getNewTypeSubject() {
    return this.newTypeName$.asObservable();// try this without asobservable
  }
  addNewTypeName(name: string, userId: string) {
    return this.http.post(orderTypesPath, {name: name, userId: userId});
  }
  deleteOrderType(userId: string, oderTypeId: number) {
    return this.http.delete(`${orderTypesPath}${userId}/${oderTypeId}`);
  }
  setTypes(types: OrderType[]) {
    this.types = types;
  }
  getTypes(): OrderType[] {
    return this.types;
  }
  emitDeleteType(orderTypeId: number) {
    this.deleteTypeSubject$.next(orderTypeId);
  }
  getDeleteSubject() {
    return this.deleteTypeSubject$.asObservable();// try this without asobservable
  }


}
