import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArticleService } from './../../../services/article.service';
import { NotificationService } from './../../../services/notification.service';
import { ArticleModel } from './../../../models/article.model';
import { NotifMsgs } from './../../../constants/notification-messages';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html'
})
export class EditArticleComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public article: ArticleModel;

  constructor(
    private _articleService: ArticleService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._subscribtions.push(
      this._articleService.getArticleById(this._route.snapshot.params.id).subscribe(res => {
        this.article = res.data;
        this.isLoading = false;
      }, err => {
        this._router.navigate(['/articles']);
        throw err;
      })
    );
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  editArticle(): void {
    this.isLoading = true;

    if (this.article.title.length < 5) {
      this._notificationService.showWarning(NotifMsgs.warning.TITLE_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (this.article.description.length < 200) {
      this._notificationService.showWarning(NotifMsgs.warning.DESCRIPTION_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const articleToEdit = {
      title: this.article.title,
      description: this.article.description
    };

    this._subscribtions.push(
      this._articleService.editArticle(this._route.snapshot.params.id, articleToEdit).subscribe(res => {
        this.isLoading = false;
        this._notificationService.showSuccess(res.data.msg);
        this._router.navigate([`/article/${res.data.article._id}`]);
      }, err => {
        this.isLoading = false;
        throw err;
      })
    );
  }

}
