import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOrderTypeDialogComponent } from './add-new-order-type-dialog.component';

describe('AddNewOrderTypeDialogComponent', () => {
  let component: AddNewOrderTypeDialogComponent;
  let fixture: ComponentFixture<AddNewOrderTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewOrderTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewOrderTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
