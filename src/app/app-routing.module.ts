import {NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./futures/dashboard/dashboard.component";
import {LoginPageComponent} from "./futures/login-page/login-page.component";
import {authGuard} from "./shared/utils/auth.guard";

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
