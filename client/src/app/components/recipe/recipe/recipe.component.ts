import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from './../../../services/recipe.service';
import { UserService } from './../../../services/user.service';
import { NotificationService } from './../../../services/notification.service';
import { RecipeModel } from './../../../models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isAdmin: boolean;
  public isLogged: boolean;
  private _currUserId: string;
  public isLoading: boolean;
  public recipe: RecipeModel;

  constructor(
    private _recipeService: RecipeService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.isAdmin = this._userService.isAdmin();
    this.isLogged = this._userService.isLogged();
    this._currUserId = this._userService.getItem('id');

    this._subscribtions.push(
      this._recipeService.getRecipeById(this._route.snapshot.params.id).subscribe(res => {
        this.recipe = res.data;
        this.recipe.isAuthor = this._currUserId === res.data.author._id ? true : false;
        this.isLoading = false;
      }, err => {
        this._router.navigate['/recipes'];
        throw err;
      })
    );
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  deleteRecipe(id: string): void {
    this.isLoading = true;

    this._subscribtions.push(
      this._recipeService.deleteRecipe(id).subscribe(res => {
        this._notificationService.showSuccess(res.data.msg);
        const route = this.isAdmin
          ? '/recipes'
          : `/my-recipes`;
        
        this._router.navigate([route]);
      }, err => {
        this.isLoading = false;
        throw err;
      })
    );
  }

}
