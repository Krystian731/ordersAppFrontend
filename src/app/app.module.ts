import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './core/routing/app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './orders/component/orders-dashboard/dashboard.component';
import { LoginPageComponent } from './login/components/login-page/login-page.component';
import {RegisterComponent} from "./login/components/login-page/register/register.component";
import {LoginComponent} from "./login/components/login-page/login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {GetErrorMessOrder, GetErrorMessUser} from "./login/components/login-page/pipes/pipes";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginPageComponent,
    RegisterComponent,
    LoginComponent,
    GetErrorMessUser,
    GetErrorMessOrder
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
