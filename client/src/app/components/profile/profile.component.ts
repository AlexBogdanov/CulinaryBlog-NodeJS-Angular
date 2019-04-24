import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from './../../services/user.service';
import { UserModel } from './../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public user: UserModel;
  public isUserLoggedUser: boolean;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._subscribtions.push(
      this._userService.getUserById(this._route.snapshot.params.id).subscribe(res => {
        let i = 0;
        let j = 0;
        const tempI = [];
        const tempJ = [];
        tempI[i] = [];
        tempJ[j] = [];

        this.user = res.data;
        this.user.articles = res.data.articles.map(article => {
          article.shortDescr = article.description.substring(0, 30);
          return article;
        }).forEach(article => {
          if (tempI[i].length < 2) {
            tempI[i].push(article);
          } else {
            i += 1;
            tempI[i] = [];
            tempI[i].push(article);
          }
        });

        if (tempI[tempI.length - 1].length < 1) {
          tempI.pop();
        }

        this.user.recipes = res.data.recipes.map(recipe => {
          recipe.shortDescr = recipe.preparation.substring(0, 30);
          return recipe;
        }).forEach(recipe => {
          if (tempJ[j].length < 2) {
            tempJ[j].push(recipe);
          } else {
            j += 1;
            tempJ[j] = [];
            tempJ[j].push(recipe)
          }
        });

        if (tempJ[tempJ.length - 1].length < 1) {
          tempJ.pop();
        }

        this.user.articles = tempI;
        this.user.recipes = tempJ;

        this.isUserLoggedUser = res.data._id === this._userService.getItem('id');
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
