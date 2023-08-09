import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard';
import {UrlTree} from "@angular/router";

describe('AuthGuard', () => {
  let guard: boolean | UrlTree;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
