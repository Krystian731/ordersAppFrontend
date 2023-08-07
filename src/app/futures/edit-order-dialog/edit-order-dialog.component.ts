import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrderType} from "../../core/models/orderType";
import {Order} from "../../core/models/order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../shared/services/date.service";


@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.scss']
})
export class EditOrderDialogComponent implements OnInit {
  public newOrder: Order = Object.assign({}, this.data.order);
  public orderForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<EditOrderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {order: Order, types: OrderType}, private formBuilder: FormBuilder, private dateService: DateService) { }

  ngOnInit() {
      this.orderForm = this.formBuilder.group({
      title: [this.data.order.title, Validators.required],
      description: [this.data.order.description, Validators.required],
      price: [this.data.order.price, Validators.required],
      client: [this.data.order.client, Validators.required],
      quantity: [this.data.order.quantity, Validators.required],
      plannedCompletionDate: [this.data.order.plannedCompletionDate, Validators.required],
      completed: [this.data.order.completed]
  });
}

  submitDialog() {
    if(this.orderForm.invalid) return;
    this.newOrder.title = this.orderForm?.get('title')?.value;
    this.newOrder.description = this.orderForm?.get('description')?.value;
    this.newOrder.price = this.orderForm?.get('price')?.value;
    this.newOrder.client = this.orderForm?.get('client')?.value;
    this.newOrder.quantity = this.orderForm?.get('quantity')?.value;
    this.newOrder.plannedCompletionDate = this.dateService.convertControlerDataToJSONFormat(this.orderForm?.get('plannedCompletionDate')?.value);
    this.newOrder.completed = this.orderForm?.get('completed')?.value;
    this.dialogRef.close(this.newOrder);
  }
}
