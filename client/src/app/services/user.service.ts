import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from './notification.service';
import { NotifMsgs } from './../constants/notification-messages';

// URLs
const registerUrl = '/user/register';
const loginUrl = '/user/login';

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

  setUserLocal(token, role) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('role', role);
  }

  setUserSession(token, role) {
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('role', role);
  }

  getToken() {
    const localStorage = window.localStorage.getItem('token');
    const sessionStorage = window.sessionStorage.getItem('token');

    return localStorage ? localStorage : sessionStorage;
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    this.notificationService.showSuccess(NotifMsgs.success.LOGOUT);
  }

  register(user) {
    return this.http.post(registerUrl, user);
  }

  login(user) {
    return this.http.post(loginUrl, user);
  }
}
