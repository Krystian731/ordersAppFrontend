import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../models/orderType.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() order?: Order;
  ngOnInit(){
    console.log(this.order);
  }
}
