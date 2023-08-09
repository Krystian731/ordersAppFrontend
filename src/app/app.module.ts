import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './futures/dashboard/dashboard.component';
import { LoginPageComponent } from './futures/login-page/login-page.component';
import { RegisterComponent} from "./futures/register/register.component";
import { LoginComponent} from "./futures/login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  GetErrorMessOrder,
  GetErrorMessPassword,
  GetErrorMessUser,
  GetFirstKey
} from "./shared/pipes/error_pipes";
import {MaterialModule} from "./shared/angular_materials/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationInterceptor} from "./shared/utils/authorization.interceptor";
import {UserHandlerService} from "./core/services/user-handler.service";
import { OrderComponent } from './futures/order/order.component';
import {OrderCompletionPipe} from "./shared/pipes/orderCompletion.pipe";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { EditOrderDialogComponent } from './futures/edit-order-dialog/edit-order-dialog.component';
import { AddOrderDialogComponent } from './futures/add-order-dialog/add-order-dialog.component';
import {AddNewOrderTypeDialogComponent } from './futures/add-new-order-type-dialog/add-new-order-type-dialog.component';
import { DeleteOrderTypeDialogComponent } from './futures/delete-order-type-dialog/delete-order-type-dialog.component';
import { OrderStateConsoleComponent } from './futures/order-state-console/order-state-console.component';
import { CutTimePipe } from './shared/pipes/cut-time.pipe';
import { DeleteDialogComponent } from './futures/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginPageComponent,
    RegisterComponent,
    LoginComponent,
    GetErrorMessUser,
    GetErrorMessOrder,
    GetErrorMessPassword,
    GetFirstKey,
    OrderComponent,
    OrderCompletionPipe,
    EditOrderDialogComponent,
    AddOrderDialogComponent,
    AddNewOrderTypeDialogComponent,
    DeleteOrderTypeDialogComponent,
    OrderStateConsoleComponent,
    CutTimePipe,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,

  ],
  providers: [
    UserHandlerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
