import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../orders/component/orders-dashboard/dashboard.component";
import {LoginPageComponent} from "../../login/components/login-page/login-page.component";
import {authGuard} from "./utils/auth.guard";

const routes: Routes = [
  { path: 'orders', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'loginPage', component: LoginPageComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
