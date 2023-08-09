import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ordersAppFrontend';
  ngOnInit() {
    window.alert("Thank you for visiting my project!\nI have arleady created some mock data for you.\nJust login as:\nlogin: xyz \npassword: 1234");
  }
}
