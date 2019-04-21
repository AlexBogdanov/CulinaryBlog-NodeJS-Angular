import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RegisterUserModel } from './../models/register-user.model';
import { LoginUserModel } from './../models/login-user.model';
import { NotificationService } from './notification.service';
import { NotifMsgs } from './../constants/notification-messages';
import { Constants } from './../constants/constants';

// URLs
const registerUrl = `${Constants.common.SERVER_BASE_PATH}/user/register`;
const loginUrl = `${Constants.common.SERVER_BASE_PATH}/user/login`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
    ) { }

  isLogged() {
    const localStorage = window.localStorage.getItem('token');
    const sessionStorage = window.localStorage.getItem('token');
    
    return localStorage || sessionStorage ? true : false;
  }

  isAdmin() {
    const localStorage = window.localStorage.getItem('role');
    const sessionStorage = window.localStorage.getItem('role');

    return localStorage === 'Admin' || sessionStorage === 'Admin'
      ? true: false;
  }

  setUserLocal(id, token, role) {
    window.localStorage.setItem('id', id);
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('role', role);
  }

  setUserSession(token, role) {
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('role', role);
  }

  getItem(itemName) {
    const localStorage = window.localStorage.getItem(itemName);
    const sessionStorage = window.sessionStorage.getItem(itemName);

    return localStorage ? localStorage : sessionStorage;
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    this.notificationService.showSuccess(NotifMsgs.success.LOGOUT);
  }

  register(user: RegisterUserModel): Observable<any> {
    return this.http.post(registerUrl, user);
  }

  login(user: LoginUserModel): Observable<any> {
    return this.http.post(loginUrl, user);
  }
}
