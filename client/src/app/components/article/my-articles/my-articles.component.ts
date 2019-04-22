import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ArticleService } from './../../../services/article.service';
import { UserService } from './../../../services/user.service';
import { ArticleModel } from './../../../models/article.model';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html'
})
export class MyArticlesComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public articles: ArticleModel[];

  constructor(
    private _articleService: ArticleService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._subscribtions.push(
      this._articleService.getUserArticles().subscribe(res => {
        let j = 0;
        const temp = [];
        temp[j] = [];

        this.articles = res.data.map(article => {
          article.shortDescr = article.description.substring(0, 200);
          return article;
        }).forEach(article => {
          if (temp[j].length < 3) {
            temp[j].push(article);
          } else {
            j += 1;
            temp[j] = [];
            temp[j].push(article);
          }
        });

        if (temp[temp.length - 1].length < 1) {
          temp.pop();
        }

        this.articles = temp;
        this.isLoading = false;
      }, err => {
        this._router.navigate(['/']);
        throw err;
      })
    );
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

}
