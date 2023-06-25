import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../models/orderType.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() order?: Order;
  @Input()  isToDisplayDetails?: boolean = false;

  //TODO simplyfy this

  ngOnInit(){
    console.log(this.order);
    if(this.isToDisplayDetails)console.log('dzialalaa');
  }


  //TODO no dobra to teraz stylujemy to wszytsko elegancko.
  // trzeba zaimkludowac tez napewno tego dropa
}
