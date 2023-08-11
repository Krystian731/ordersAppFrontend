# OrdersAppFrontend

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Usage](#usage)
* [Prerequisites](#prerequisites)
* [Setup](#setup)
* [Roadmap](#Roadmap)

## General info
This project is a management system for my friend's flower shop. It is designed to manage upcoming orders. 
	
## Technologies
The project is created with:
* angular/core: "15.2.0" <img style="width:20px" src="https://user-images.githubusercontent.com/25181517/183890595-779a7e64-3f43-4634-bad2-eceef4e80268.png" />
* moment.js: "2.29.4" <img style="width:20px" src="https://momentjs.com/static/img/moment-favicon.png" />
* rxjs: "7.8.0" <img style="width:20px" src="https://rxjs.dev/assets/images/logos/Rx_Logo_S.png"/>
* typescript: "4.9.4"  <img style="width:20px" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" />
* tailwindcss: "3.3.2" <img style="width:20px" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" />
* ngx-cookie-service: "15.0.0"
* angular/material: "15.2.9" <img style="width:20px" src="https://material.angular.io/assets/img/angular-material-logo.svg" />
* Git: "2.39.1" <img style="width:20px" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" />
## Features
- [x] Users
  - [x] Login
  - [x] Register
  - [x] JWT authentication
- [x] Displaying orders
  - [x] by current day
  - [x] by current week
  - [x] by custom day
  - [x] by custom range
- [x] Order management
  - [x] Add order
  - [x] Delete order
  - [x] Edit Order
- [x] Order type management
  - [x] Add order type
  - [x] Delete order type
- [x] Norifications 
## Usage 
<img  src="./images/login_page.png"/> 
<img  src="./images/dashboard_day.png"/>
<img  src="./images/dashboard_custom_range.png"/> 
<img  src="./images/add_order_dialog.png"/> 
<img  src="./images/add_order_type_dialog.png"/>

## Prerequisites
 Make sure you have Node.js and npm (Node Package Manager) installed on your computer.<br>
You can download them from the official website: https://nodejs.org/
## Setup
1. Install Angular CLI:
```
npm install -g @angular/cli
```
2. Clone the Project:
```
git clone https://github.com/Krystian731/ordersAppFrontend

```
3. Navigate to Project Directory:
```
cd ordersAppFrontend

```
4. Install Dependencies:
```
npm install

```
5. Serve the Application:
```
ng serve

```
 Then navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
 
 Note that the application will not work properly without running OrdersAppBackend.
 ## Roadmap
 * user will be greeted with more animations

   
