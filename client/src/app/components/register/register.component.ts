import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { RegisterUserModel } from './../../models/register-user.model';
import { NotifMsgs } from './../../constants/notification-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  private _subscibtions: Subscription[] = [];
  public isLoading: boolean;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscibtions.forEach(sub => sub.unsubscribe());
  }

  registerUser(): void {
    this.isLoading = true;

    if (!this.firstName) {
      this._notificationService.showWarning(NotifMsgs.warning.FIRST_NAME_REQUIRED);
      this.isLoading = false;
      return;
    }

    if (!this.lastName) {
      this._notificationService.showWarning(NotifMsgs.warning.LAST_NAME_REQUIRED);
      this.isLoading = false;
      return;
    }

    if (this.username.length < 3) {
      this._notificationService.showWarning(NotifMsgs.warning.USERNAME_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (!this.email) {
      this._notificationService.showWarning(NotifMsgs.warning.EMAIL_REQUIRED);
      this.isLoading = false;
      return;
    }

    if (this.password.length < 6) {
      this._notificationService.showWarning(NotifMsgs.warning.PASSWORD_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const userToCreate = new RegisterUserModel(this.firstName, this.lastName, this.username, this.email, this.password);

    this._subscibtions.push(
      this._userService.register(userToCreate).subscribe(
        res => {
          this.isLoading = false;
          this._notificationService.showSuccess(res.data.msg);
          this._router.navigate(['/']);
        }, err => {
          this.isLoading = false;
          throw err;
        }
      )
    );
  }

}
