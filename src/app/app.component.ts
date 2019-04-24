import { Component } from '@angular/core';
import { UserService } from "./auth/user.service";
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seguros';
  constructor(private userService:UserService, private _cookieService:CookieService){
    if(_cookieService.get("user")){
    }
  }
}
