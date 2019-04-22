import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { RecipeService } from './../../../services/recipe.service';
import { NotificationService } from './../../../services/notification.service';
import { UserService } from './../../../services/user.service';
import { RecipeModel } from './../../../models/recipe.model';
import { NotifMsgs } from './../../../constants/notification-messages';
import { debug } from 'util';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html'
})
export class CreateRecipeComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public name: string = '';
  public preparation: string = '';
  public products: string[] = [];
  public currProduct: string = '';
  public img: string;

  constructor(
    private _recipeService: RecipeService,
    private _notificationService: NotificationService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }

  createRecipe(): void {
    this.isLoading = true;

    if (this.name.length < 5) {
      this._notificationService.showWarning(NotifMsgs.warning.NAME_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (this.products.length < 3) {
      this._notificationService.showWarning(NotifMsgs.warning.NOT_ENOUGH_PRODUCTS);
      this.isLoading = false;
      return;
    } 

    if (this.preparation.length < 200) {
      this._notificationService.showWarning(NotifMsgs.warning.PREPARATION_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const userId = this._userService.getItem('id');
    const recipeToCreate = new RecipeModel(this.name, this.preparation, this.products, userId);

    if (this.img) {
      recipeToCreate.img = this.img;
    }

    this._subscribtions.push(
      this._recipeService.createRecipe(recipeToCreate).subscribe(res => {
        this.isLoading = false;
        this._notificationService.showSuccess(res.data.msg);
        this._router.navigate([`/recipe/${res.data.recipe._id}`]);
      }, err => {
        this.isLoading = false;
        throw err;
      })
    );
  }

  addProduct(): void {
    if (!this.currProduct) {
      this._notificationService.showWarning(NotifMsgs.warning.INVALID_PRODUCT);
      return;
    }

    if (this.products.includes(this.currProduct)) {
      this._notificationService.showWarning(NotifMsgs.warning.PRODUCT_ADDED);
      return;
    }

    this.products.push(this.currProduct);
    this.currProduct = '';
  }

  removeProduct(product: string): void {
    const index = this.products.indexOf(product);

    if (index === -1) {
      this._notificationService.showWarning(NotifMsgs.warning.PRODUCT_NOT_IN_LIST);
      return;
    }

    this.products.splice(index, 1);
  }

}
