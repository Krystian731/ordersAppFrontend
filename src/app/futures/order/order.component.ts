import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../core/models/order";
import {MatDialog} from "@angular/material/dialog";
import {EditOrderDialogComponent} from "../edit-order-dialog/edit-order-dialog.component";
import {dropdownArrow} from "../../shared/utils/animations";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [dropdownArrow]
})
export class OrderComponent implements OnInit {
  @Input() order?: Order;
  @Input()  isToDisplayDetails?: boolean = false;
  @Input()  orderTypeName?: string;
  @Input() index?: number;
  @Output() dropdownEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<{order: Order, index: number}>();


  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    console.log('w oder: ' + this.orderTypeName);
  }
  delete() {

  }
  emitEditEvent() {
    if(this.order === undefined || this.index === undefined)
      return;
   this.editEvent.emit({order: this.order, index: this.index});
  }
  emitDropdownEvent() {
    this.dropdownEvent.emit(this.index);
  }


}
