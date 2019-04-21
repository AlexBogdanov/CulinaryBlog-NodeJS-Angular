import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from './../../../services/article.service';
import { UserService } from './../../../services/user.service';
import { NotificationService } from './../../../services/notification.service';
import { ArticleModel } from './../../../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isAdmin: boolean;
  private _currUserId: string;
  public isLoading: boolean;
  public article: ArticleModel;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.isAdmin = this._userService.isAdmin();
    this._currUserId = this._userService.getItem('id');

    this._subscribtions.push(
      this._articleService.getArticleById(this._route.snapshot.params.id).subscribe(res => {
        this.article = res.data;
        this.article.isAuthor = this._currUserId === res.data.author._id ? true : false;
        this.isLoading = false;
      }, err => {
        this._router.navigate['/articles'];
        throw err;
      })
    );
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  deleteArticle(id: string): void {
    this.isLoading = true;

    this._subscribtions.push(
      this._articleService.deleteArticle(id).subscribe(res => {
        this._notificationService.showSuccess(res.data.msg);
        const route = this.isAdmin
          ? '/articles'
          : `/my-articles/${this._currUserId}`;
        
        this._router.navigate([route]);
      }, err => {
        this.isLoading = false;
        throw err;
      })
    );
  }

}
