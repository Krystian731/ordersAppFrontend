import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
  Router
} from '@angular/router';
import {AuthService} from "../../auth/auth.service";

export const authGuard = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  console.log('guard');
  return (inject(AuthService).isUsernameSet() ? true : router.parseUrl('/loginPage'));
};
