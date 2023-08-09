import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrderType} from "../../core/models/orderType";
import {DateService} from "../../shared/services/date.service";
import {AddNewOrderTypeDialogComponent} from "../add-new-order-type-dialog/add-new-order-type-dialog.component";
import {OrderTypesService} from "../../core/services/order-types.service";
import {DeleteOrderTypeDialogComponent} from "../delete-order-type-dialog/delete-order-type-dialog.component";

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent implements OnInit {
  public orderForm!: FormGroup;
  public orderTypes: OrderType[] = [] ;

  constructor(public dialogRef: MatDialogRef<AddOrderDialogComponent>, private formBuilder: FormBuilder, private dateService: DateService, private dialog: MatDialog, private typesService: OrderTypesService) {
  }


  ngOnInit() {
    this.orderTypes= this.typesService.getOrderTypes();
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
  submitDialog() {
    if(this.orderForm.invalid) return;
    let newOrder= {
      title: this.orderForm?.get('title')?.value,
      description: this.orderForm?.get('description')?.value,
      price: this.orderForm?.get('price')?.value,
      client: this.orderForm?.get('client')?.value,
      quantity: this.orderForm?.get('quantity')?.value,
      plannedCompletionDate : this.dateService.convertControlerDataToJSONFormat(this.orderForm?.get('plannedCompletionDate')?.value),
      completed:  this.orderForm?.get('completed')?.value,
      orderTypeId:this.orderTypes[this.orderForm?.get('orderTypeName')?.value].orderTypeId
    }
    this.dialogRef.close(newOrder);
  }
  openAddNewOrderTypeDialog() {
    this.dialog.open(AddNewOrderTypeDialogComponent,{
      height: '300px',
      width: '400px',
    });
  }
  openDeleteOrderTypeDialog() {
    this.dialog.open(DeleteOrderTypeDialogComponent, {
      height: '300px',
      width: '400px'
    })
  }
  logTypes() {
    this.orderTypes = this.typesService.getOrderTypes();
  }
  refreshTypes() {
    this.orderTypes = this.typesService.getOrderTypes();
  }

}
