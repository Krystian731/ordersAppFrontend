import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../core/models/order";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditOrderDialogComponent} from "../edit-order-dialog/edit-order-dialog.component";
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
  public types: OrderType[] = this.typesService.getTypes() ;

  constructor(public dialogRef: MatDialogRef<AddOrderDialogComponent>, private formBuilder: FormBuilder, private dateService: DateService, private dialog: MatDialog, private typesService: OrderTypesService) {
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
  //TODO rewrtie this submit solution lkike on addtype
  submitDialog() { // no bo ja w sumie to coś tutaj musze zwrocic i moge w sumie wzrocic tak samo ze wzram neworder i tyle
    if(this.orderForm.invalid) return; //TODO rewrite this like on addtype, we can just return value of whole form gropup and in smart comp reassign
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
  openAddNewOrderTypeDialog() {
    let dialogref = this.dialog.open(AddNewOrderTypeDialogComponent,{
      height: '50vh',
      width: '30vw',
    }) // tutaj moge dac suba zawsze
    dialogref.afterClosed().subscribe(() => {
     // dobra to moze nie wypalic ale zawsze mozna dac onclikca
    })

  }
  openDeleteOrderTypeDialog() {
    let dialogref = this.dialog.open(DeleteOrderTypeDialogComponent, { // i terraz ten dialog sobie ustawi emita na serwisie z delte i tyle.
      height: '50vh',
      width: '30vw'
    })
    dialogref.afterClosed().subscribe(() => {

    })
  }
  logTypes() {
    console.log(`typy w add dialog : ${this.types.length}`);
    this.types = this.typesService.getTypes();
  }
  refreshTypes() {
    this.types = this.typesService.getTypes();
  }

}
