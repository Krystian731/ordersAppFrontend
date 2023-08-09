import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateConsoleComponent } from './order-state-console.component';

describe('OrderStateConsoleComponent', () => {
  let component: OrderStateConsoleComponent;
  let fixture: ComponentFixture<OrderStateConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
