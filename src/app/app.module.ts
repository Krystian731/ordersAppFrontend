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
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {OrderCompletionPipe} from "./shared/pipes/orderCompletion.pipe";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import { EditOrderDialogComponent } from './futures/edit-order-dialog/edit-order-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddOrderDialogComponent } from './futures/add-order-dialog/add-order-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {AddNewOrderTypeDialogComponent } from './futures/add-new-order-type-dialog/add-new-order-type-dialog.component';
import {FormsModule} from "@angular/forms";
import { DeleteOrderTypeDialogComponent } from './futures/delete-order-type-dialog/delete-order-type-dialog.component';
import { OrderStateConsoleComponent } from './futures/order-state-console/order-state-console.component';

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
    OrderStateConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [UserHandlerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
