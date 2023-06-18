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
  return (inject(AuthService).isUserIdSet() ? true : router.parseUrl('/loginPage'));

  // dochodzi do stytuacji w której token nie jest już poprawny ale guard i
  // tak przepuszcza na strone co prowadzi do sytuacji erroru w request
  // czy tak powinno byc i czy inaczej powininen byc zaimplementowany ten guard
};
