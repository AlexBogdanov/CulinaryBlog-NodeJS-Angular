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

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.isLogged = this._userService.isLogged();
    this.isAdmin = this._userService.isAdmin();
  }

  logout(): void {
    this._userService.logout();
    window.location.href = '/';
  }
}
