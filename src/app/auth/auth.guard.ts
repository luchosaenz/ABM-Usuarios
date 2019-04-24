import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _cookieService:CookieService, public router: Router,private message: NzMessageService){}
  canActivate(): boolean{
      if (!this._cookieService.get('token')) {
        this.router.navigate(['login']);
        this.message.warning('Debe loguearse!', {
          nzDuration: 1500
        });
        return false;
      }
      return true;
  }
  
}
