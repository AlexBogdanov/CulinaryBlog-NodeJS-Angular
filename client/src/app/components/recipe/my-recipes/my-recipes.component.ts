import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { RecipeService } from './../../../services/recipe.service';
import { UserService } from './../../../services/user.service';
import { RecipeModel } from './../../../models/recipe.model';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html'
})
export class MyRecipesComponent implements OnInit, OnDestroy {

  private _subscribtions: Subscription[] = [];
  public isLoading: boolean;
  public recipes: RecipeModel[];

  constructor(
    private _recipeService: RecipeService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    
    this._subscribtions.push(
      this._recipeService.getUserRecipes().subscribe(res => {
        let j = 0;
        const temp = [];
        temp[j] = [];
        
        this.recipes = res.data.map(recipe => {
          recipe.shortDescr = recipe.preparation.substring(0, 200);
          return recipe;
        }).forEach(recipe => {
          if (temp[j].length < 3) {
            temp[j].push(recipe);
          } else {
            j += 1;
            temp[j] = [];
            temp[j].push(recipe);
          }
        });

        if (temp[temp.length - 1].length < 1) {
          temp.pop();
        }

        this.recipes = temp;
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
