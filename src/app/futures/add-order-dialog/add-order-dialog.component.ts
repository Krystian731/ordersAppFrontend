import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../core/models/order";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditOrderDialogComponent} from "../edit-order-dialog/edit-order-dialog.component";
import {OrderType} from "../../core/models/orderType";
import {DateService} from "../../shared/services/date.service";

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent implements OnInit {
  public orderForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditOrderDialogComponent>, @Inject(MAT_DIALOG_DATA) public types: OrderType[], private formBuilder: FormBuilder, private dateService: DateService) {
  }


  ngOnInit() { //TODO make thi  a fucntion
    this.orderForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      client: ['', Validators.required],
      quantity: ['', Validators.required],
      plannedCompletionDate: ['', Validators.required],
      orderTypeName: ['', Validators.required],
      completed: [false]
    });
  }
  submitDialog() { // no bo ja w sumie to coś tutaj musze zwrocic i moge w sumie wzrocic tak samo ze wzram neworder i tyle
    if(this.orderForm.invalid) return;
    let newOrder= {
      title: this.orderForm?.get('title')?.value,
      description: this.orderForm?.get('description')?.value,
      price: this.orderForm?.get('price')?.value,
      client: this.orderForm?.get('client')?.value,
      quantity: this.orderForm?.get('quantity')?.value,
      plannedCompletionDate : this.dateService.convertControlerDataToJSONFormat(this.orderForm?.get('plannedCompletionDate')?.value),
      completed:  this.orderForm?.get('completed')?.value,
      orderTypeId: this.types[this.orderForm?.get('orderTypeName')?.value].orderTypeId // i tutaj w zaleznosci czy indexy sie zaczynaja o d 0 czy od 1 trzeba sprawdzic
    }
    this.dialogRef.close(newOrder);
  }
}
