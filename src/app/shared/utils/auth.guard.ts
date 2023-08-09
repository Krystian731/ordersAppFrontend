import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import {AuthService} from "../../core/services/auth.service";

export const authGuard = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  console.log('guard');
  return (inject(AuthService).isUserIdSet() ? true : router.parseUrl('/loginPage'));
};
