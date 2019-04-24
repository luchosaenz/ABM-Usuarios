import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./auth/auth.guard";

import { CookieModule } from 'ngx-cookie';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
