import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ArticleService } from './../../../services/article.service';
import { NotificationService } from './../../../services/notification.service';
import { UserService } from './../../../services/user.service';
import { ArticleModel } from './../../../models/article.model';
import { NotifMsgs } from './../../../constants/notification-messages';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html'
})
export class CreateArticleComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public title: string;
  public description: string;
  public img: string;

  constructor(
    private _articleService: ArticleService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  createArticle(): void {
    this.isLoading = true;

    if (this.title.length < 5) {
      this._notificationService.showWarning(NotifMsgs.error.TITLE_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (this.description.length < 70) {
      this._notificationService.showWarning(NotifMsgs.error.DESCRIPTION_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const userId = this._userService.getItem('id');
    const articleToCreate = new ArticleModel(this.title, this.description, userId);

    if (this.img) {
      articleToCreate.img = this.img;
    }

    this._subscribtions.push(
      this._articleService.createArticle(articleToCreate).subscribe(
        res => {
          this.isLoading = false;
          this._notificationService.showSuccess(res.data.msg);
          this._router.navigate([`/article/${res.data.article._id}`]);
        }, err => {
          this.isLoading = false;
          throw err;
        }
      )
    );
  }

}
