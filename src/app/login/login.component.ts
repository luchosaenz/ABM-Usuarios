import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NzMessageService } from 'ng-zorro-antd';

import { LoginService } from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private message: NzMessageService, private loginService:LoginService) {}
  submitForm(): void {
    console.log("validateForm: ",this.validateForm.controls);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.datosValidos()){
      this.createBasicMessage();
    }
  }
  datosValidos():boolean{
    let valido=true;
    for (const i in this.validateForm.controls) {
      valido = this.validateForm.controls[i].valid &&valido;
    }
    return valido;
  }
  createBasicMessage(): void {
    const credentials={
      username: this.validateForm.controls.userName.value,
      password: this.validateForm.controls.password.value,
    }
    const id = this.message.loading('Comprobando credenciales..', { nzDuration: 0 }).messageId;
    this.loginService.login(credentials).subscribe(res=>{
      
        this.router.navigate(['home']);
        this.message.remove(id);
        this.message.success('Logueo exitoso!', {
          nzDuration: 1500
        });
      
    })
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
