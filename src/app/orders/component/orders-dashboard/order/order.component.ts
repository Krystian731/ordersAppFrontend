import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../models/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() order?: Order;
  @Input()  isToDisplayDetails?: boolean = false;
  @Input()  orderTypeName?: string;

  ngOnInit() {
    console.log('w oder: ' + this.orderTypeName);
  }


  //TODO no dobra to teraz stylujemy to wszytsko elegancko.
  // trzeba zaimkludowac tez napewno tego dropa
}
