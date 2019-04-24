import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user= new Rx.Subject();

  constructor(private _cookieService:CookieService) { }
  setUser(user){

    this._cookieService.put('user',user);
    this._user.next(user);
    return user;
  }
  getUser() {
    return this._user;
  }
  clearUser(){
    this._cookieService.remove('user')
    this._user.next(null);
  }
}
