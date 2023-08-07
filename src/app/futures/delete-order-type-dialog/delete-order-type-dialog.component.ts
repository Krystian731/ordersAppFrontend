import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../shared/services/date.service";
import {OrderTypesService} from "../../core/services/order-types.service";
import {OrderType} from "../../core/models/orderType";

@Component({
  selector: 'app-delete-order-type-dialog',
  templateUrl: './delete-order-type-dialog.component.html',
  styleUrls: ['./delete-order-type-dialog.component.scss']
})
export class DeleteOrderTypeDialogComponent implements OnInit {
  public selectForm!: FormGroup;
  public orderTypes: OrderType[] = [];
  constructor(public dialogRef: MatDialogRef<DeleteOrderTypeDialogComponent>, private formBuilder: FormBuilder, private dialog: MatDialog, private typesService: OrderTypesService) {
  }
  ngOnInit() {
    this.orderTypes = this.typesService.getOrderTypes();
    this.selectForm = this.formBuilder.group({
      orderTypeName: ['', Validators.required]
    });
  }
  submitDialog() {
    this.typesService.emitDeleteType(this.orderTypes[this.selectForm?.get('orderTypeName')?.value].orderTypeId);
    this.dialogRef.close();
  }
}
