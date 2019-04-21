import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public isLoading: boolean;
  public isLogged: boolean;
  public isAdmin: boolean;
  public currUserId: string;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.isLogged = this._userService.isLogged();
    this.isAdmin = this._userService.isAdmin();
    this.currUserId = this._userService.getItem('id');
  }

  logout(): void {
    this._userService.logout();
    window.location.href = '/';
  }
}
