import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ArticleService } from './../../../services/article.service';
import { ArticleModel } from './../../../models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public articles: ArticleModel[];

  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._subscribtions.push(
      this._articleService.getAllArticles().subscribe(res => {
        let j = 0;
        const temp = [];
        temp[j] = [];

        res.data.map(article => {
          article.shortDescr = article.description.substring(0, 30);
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
