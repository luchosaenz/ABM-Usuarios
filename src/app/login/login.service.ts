import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { v4 as uuid } from 'uuid';
import { environment } from "../../environments/environment";
import { UserService } from "../auth/user.service"
import { HttpClient } from "@angular/common/http";
import { map, delay, tap } from "rxjs/operators";
import { of } from "rxjs";

import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private _cookieService:CookieService, private router:Router, private userService:UserService) { 
    
  }

  login(credentials){
    if(environment.production){
      return this.http.post(`${environment.apiUrl}/login/`,credentials)
      .pipe(map((res: any) => res.result));
    }else{
      const token = uuid();
      setTimeout(()=>{
        this._cookieService.put('token',token);
        this.userService.setUser(credentials.username);
      }, 2000)
      return of(token).pipe(delay(2000));
    }
  }
  logout(){
    this.router.navigate(['login']);
    this.userService.clearUser();
    this._cookieService.remove('token');
  }
}
