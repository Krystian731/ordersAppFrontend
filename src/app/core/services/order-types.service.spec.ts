import { TestBed } from '@angular/core/testing';

import { OrderTypesService } from './order-types.service';

describe('OrderTypesService', () => {
  let service: OrderTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
