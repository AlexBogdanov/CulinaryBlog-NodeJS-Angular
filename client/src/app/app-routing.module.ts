import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth-guard.service';

// Common
import { HomeComponent } from './components/home/home.component';

// User
import { ProfileComponent } from './components/profile/profile.component';

// Article
import { ArticlesComponent } from './components/article/articles/articles.component';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { ArticleComponent } from './components/article/article/article.component';
import { MyArticlesComponent } from './components/article/my-articles/my-articles.component';

// Recipe
import { RecipesComponent } from './components/recipe/recipes/recipes.component';
import { CreateRecipeComponent } from './components/recipe/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { RecipeComponent } from './components/recipe/recipe/recipe.component';
import { MyRecipesComponent } from './components/recipe/my-recipes/my-recipes.component';

const routes: Routes = [
  // Common
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // User
  { path: 'profile/:id', component: ProfileComponent , canActivate: [AuthGuard]},
  // Article
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/create', component: CreateArticleComponent, canActivate: [AuthGuard] },
  { path: 'article/edit/:id', component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'my-articles', component: MyArticlesComponent, canActivate: [AuthGuard] },
  // Recipe
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/create', component: CreateRecipeComponent, canActivate: [AuthGuard] },
  { path: 'recipe/edit/:id', component: EditRecipeComponent, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'my-recipes', component: MyRecipesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
