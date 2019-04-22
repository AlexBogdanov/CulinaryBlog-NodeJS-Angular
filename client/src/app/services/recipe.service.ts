import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecipeModel } from './../models/recipe.model';
import { Constants } from './../constants/constants';

// URLs
const createRecipeUrl = `${Constants.common.SERVER_BASE_PATH}/recipe/create`;
const getAllRecipesUrl = `${Constants.common.SERVER_BASE_PATH}/recipe/all`;
const getRecipeByIdUrl = `${Constants.common.SERVER_BASE_PATH}/recipe/get/`;
const deleteRecipeUrl = `${Constants.common.SERVER_BASE_PATH}/recipe/delete/`;
const editRecipeUrl = `${Constants.common.SERVER_BASE_PATH}/recipe/edit`;
const getUserRecipesUrl = `${Constants.common.SERVER_BASE_PATH}/recipe/userRecipes`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _http: HttpClient) { }

  createRecipe(recipe: RecipeModel): Observable<any> {
    return this._http.post(createRecipeUrl, recipe);
  }

  getAllRecipes(): Observable<any> {
    return this._http.get(getAllRecipesUrl);
  }

  getRecipeById(recipeId: string): Observable<any> {
    return this._http.get(getRecipeByIdUrl + recipeId);
  }

  deleteRecipe(recipeId: string): Observable<any> {
    return this._http.delete(deleteRecipeUrl + recipeId);
  }

  editRecipe(recipeId: string, recipe: any): Observable<any> {
    return this._http.put(editRecipeUrl, { recipeId, recipe });
  }

  getUserRecipes(): Observable<any> {
    return this._http.get(getUserRecipesUrl);
  }

}
