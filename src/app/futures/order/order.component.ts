import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../core/models/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() order?: Order;
  @Input()  isToDisplayDetails?: boolean = false;
  @Input()  orderTypeName?: string;
  @Input() index?: number;
  @Output() dropdownEvent = new EventEmitter<number>();

  ngOnInit() {
    console.log('w oder: ' + this.orderTypeName);
  }
  delete() {

  }
  edit() {

  }
  emitDropdownEvent() {
    this.dropdownEvent.emit(this.index);
  }
}
