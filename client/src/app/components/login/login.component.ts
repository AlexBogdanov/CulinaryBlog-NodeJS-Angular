import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { LoginUserModel } from './../../models/login-user.model';
import { NotifMsgs } from './../../constants/notification-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public username: string;
  public password: string;

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  loginUser(): void {
    this.isLoading = true;

    if (this.username.length < 3) {
      this._notificationService.showWarning(NotifMsgs.warning.USERNAME_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (this.password.length < 6) {
      this._notificationService.showWarning(NotifMsgs.warning.PASSWORD_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const userToLog = new LoginUserModel(this.username, this.password);

    this._subscribtions.push(
      this._userService.login(userToLog).subscribe(
        res => {
          this._userService.setUserLocal(res.data.user._id, res.data.token, res.data.user.roles[0]);
          this.isLoading = false;
          this._notificationService.showSuccess(res.data.msg);
          window.location.href = '/';
        }, err => {
          this.isLoading = false;
          throw err;
        }
      )
    );
  }

}
