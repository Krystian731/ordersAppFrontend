import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditOrderDialogComponent} from "../edit-order-dialog/edit-order-dialog.component";
import {OrderType} from "../../core/models/orderType";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../shared/services/date.service";
import {OrderTypesService} from "../../core/services/order-types.service";

@Component({
  selector: 'app-add-new-order-type-dialog',
  templateUrl: './add-new-order-type-dialog.component.html',
  styleUrls: ['./add-new-order-type-dialog.component.scss']
})
export class AddNewOrderTypeDialogComponent implements OnInit{
  public orderTypeForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddNewOrderTypeDialogComponent>, private formBuilder: FormBuilder, private orderTypesService: OrderTypesService) {}

  ngOnInit() {
    this.orderTypeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.orderTypeForm.valid) {
      this.orderTypesService.emitNewTypeName(this.orderTypeForm.get('name')?.value);
      this.dialogRef.close();
    }
  }
}
