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

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.isLogged = this.userService.isLogged();
    this.isAdmin = this.userService.isAdmin();
  }

  logout(): void {
    this.userService.logout();
  }
}
