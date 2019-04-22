import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from './../../../services/recipe.service';
import { NotificationService } from './../../../services/notification.service';
import { RecipeModel } from './../../../models/recipe.model';
import { NotifMsgs } from './../../../constants/notification-messages';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html'
})
export class EditRecipeComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public recipe: RecipeModel;
  public currProduct: string = '';

  constructor(
    private _recipeService: RecipeService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._subscribtions.push(
      this._recipeService.getRecipeById(this._route.snapshot.params.id).subscribe(res => {
        this.recipe = res.data;
        this.isLoading = false;
      }, err => {
        this._router.navigate(['/recipes']);
        throw err;
      })
    );
  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe());
  }
  editRecipe(): void {
    this.isLoading = true;

    if (this.recipe.name.length < 5) {
      this._notificationService.showWarning(NotifMsgs.warning.NAME_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    if (this.recipe.products.length < 3) {
      this._notificationService.showWarning(NotifMsgs.warning.NOT_ENOUGH_PRODUCTS);
      this.isLoading = false;
      return;
    }

    if (this.recipe.preparation.length < 200) {
      this._notificationService.showWarning(NotifMsgs.warning.PREPARATION_TOO_SHORT);
      this.isLoading = false;
      return;
    }

    const recipeToEdit = {
      name: this.recipe.name,
      products: this.recipe.products,
      preparation: this.recipe.preparation
    };

    this._subscribtions.push(
      this._recipeService.editRecipe(this._route.snapshot.params.id, recipeToEdit).subscribe(res => {
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

    if (this.recipe.products.includes(this.currProduct)) {
      this._notificationService.showWarning(NotifMsgs.warning.PRODUCT_ADDED);
      return;
    }

    this.recipe.products.push(this.currProduct);
    this.currProduct = '';
  }

  removeProduct(product: string): void {
    const index = this.recipe.products.indexOf(product);

    if (index === -1) {
      this._notificationService.showWarning(NotifMsgs.warning.PRODUCT_NOT_IN_LIST);
      return;
    }

    this.recipe.products.splice(index, 1);
  }

}
