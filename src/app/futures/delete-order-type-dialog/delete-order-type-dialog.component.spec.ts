import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderTypeDialogComponent } from './delete-order-type-dialog.component';

describe('DeleteOrderTypeDialogComponent', () => {
  let component: DeleteOrderTypeDialogComponent;
  let fixture: ComponentFixture<DeleteOrderTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOrderTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
