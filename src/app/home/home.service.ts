import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, delay, tap } from "rxjs/operators";
import { of } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  users = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      email: 'johnbrown@gmail.com'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      email: 'jimGreen@gmail.com'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      email: 'joeblack@gmail.com'
    }
  ];

  constructor(private http: HttpClient) { }

  getUser(){
    if(environment.production){
      return this.http
      .get(`${environment.apiUrl}/users/`)
      .pipe(map((res: GenericServerResponse) => res.result));
    }else{
      return of(this.users).pipe(delay(1000));
    }
  }
  deleteUser(key){
    if(environment.production){
      return this.http
      .delete(`${environment.apiUrl}/users/${key}`)
      .pipe(map((res: GenericServerResponse) => res.result));
    }else{
      return this.borrar(key);
    }
  }


  borrar(key){
    this.users = this.users.filter(d => d.key !== key);
    return of({message:"Usuario borrado",result:this.users}).pipe(delay(2000));
  }
}



export interface GenericServerResponse {
  result?: any;
  message?: string;
  error?: string;
}