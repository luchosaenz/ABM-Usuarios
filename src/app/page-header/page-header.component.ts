import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { LoginService } from "../login/login.service"

import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  user=null;
  private userSubscription: Subscription;
  constructor(private router:Router, private loginService:LoginService, private userService:UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe(user =>{
      this.user = user;
    })
  }

  cerrarSesion(){
    this.loginService.logout();
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
    }
  }
}
