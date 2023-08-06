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
export class DeleteOrderTypeDialogComponent implements OnInit{
  public types: OrderType[] = this.typesService.getTypes();
  public selectForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<DeleteOrderTypeDialogComponent>, private formBuilder: FormBuilder, private dialog: MatDialog, private typesService: OrderTypesService) {
  }
  ngOnInit() {
    this.selectForm = this.formBuilder.group({
      orderTypeName: ['', Validators.required]
    });

  }
  submitDialog() {
    this.typesService.emitDeleteType(this.types[this.selectForm?.get('orderTypeName')?.value].orderTypeId);
    console.log('emit');
    this.dialogRef.close();
  }
}
