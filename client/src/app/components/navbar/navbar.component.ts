import { Component, OnInit , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { NotifMsgs } from './../../constants/notification-messages';
import { RegisterUserModel } from './../../models/register-user.model';
import { LoginUserModel } from './../../models/login-user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public isLogged: boolean;
  public isAdmin: boolean;
  public currUserId: string;
  public firstName: string;
  public lastName: string;
  public usernameRegister: string;
  public email: string;
  public passwordRegister: string;
  public usernameLogin: string;
  public passwordLogin: string;

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.isLogged = this._userService.isLogged();
    this.isAdmin = this._userService.isAdmin();
    this.currUserId = this._userService.getItem('id');
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  logout(): void {
    this._userService.logout();
    setTimeout(() => { window.location.href = '/'; }, 2000);
  }

  registerUser(e): void {
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

    if (this.usernameRegister.length < 3) {
      this._notificationService.showWarning(NotifMsgs.warning.USERNAME_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (!this.email) {
      this._notificationService.showWarning(NotifMsgs.warning.EMAIL_REQUIRED);
      this.isLoading = false;
      return;
    }

    if (this.passwordRegister.length < 6) {
      this._notificationService.showWarning(NotifMsgs.warning.PASSWORD_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const userToCreate = new RegisterUserModel(this.firstName, this.lastName, this.usernameRegister, this.email, this.passwordRegister);

    this._subscribtions.push(
      this._userService.register(userToCreate).subscribe(res => {
          this._notificationService.showSuccess(res.data.msg);
          this.isLoading = false;
          e.hide();
        }, err => {
          this.isLoading = false;
          throw err;
        }
      )
    );
  }

  loginUser(e): void {
    this.isLoading = true;

    if (this.usernameLogin.length < 3) {
      this._notificationService.showWarning(NotifMsgs.warning.USERNAME_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (this.passwordLogin.length < 6) {
      this._notificationService.showWarning(NotifMsgs.warning.PASSWORD_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const userToLog = new LoginUserModel(this.usernameLogin, this.passwordLogin);

    this._subscribtions.push(
      this._userService.login(userToLog).subscribe(res => {
          this._userService.setUserLocal(res.data.user._id, res.data.token, res.data.user.roles[0]);
          this._notificationService.showSuccess(res.data.msg);
          this.isLoading = false;
          setTimeout(() => { 
            e.hide();
            window.location.href = '/';
          }, 2000);
        }, err => {
          this.isLoading = false;
          throw err;
        }
      )
    );
  }
  
}
