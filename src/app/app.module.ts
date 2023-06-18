import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './core/routing/app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './orders/component/orders-dashboard/dashboard.component';
import { LoginPageComponent } from './login/components/login-page/login-page.component';
import {RegisterComponent} from "./login/components/login-page/register/register.component";
import {LoginComponent} from "./login/components/login-page/login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  GetErrorMessOrder,
  GetErrorMessPassword,
  GetErrorMessUser,
  GetFirstKey
} from "./login/components/login-page/pipes/pipes";
import {MaterialModule} from "./shared/material/material.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthorizationInterceptor} from "./core/auth/authorization.interceptor";
import {UserHandlerService} from "./login/services/user-handler.service";
import { OrderComponent } from './orders/component/orders-dashboard/order/order.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

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
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatButtonToggleModule
  ],
  providers: [UserHandlerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
