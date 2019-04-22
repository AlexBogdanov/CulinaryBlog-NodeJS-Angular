import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Interceptors
import { ServerErrorInterceptor } from './http-interceptors/server-error-interceptor';
import { TokenInterceptor } from './http-interceptors/token-interceptor';

// Error handler
import { GlobalErrorHandler } from './utilities/global-error-handler';

// Components
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ArticlesComponent } from './components/article/articles/articles.component';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { ArticleComponent } from './components/article/article/article.component';
import { MyArticlesComponent } from './components/article/my-articles/my-articles.component';
import { RecipesComponent } from './components/recipe/recipes/recipes.component';
import { CreateRecipeComponent } from './components/recipe/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { RecipeComponent } from './components/recipe/recipe/recipe.component';
import { MyRecipesComponent } from './components/recipe/my-recipes/my-recipes.component';

// Services
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { RecipeService } from './services/recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    CreateArticleComponent,
    EditArticleComponent,
    RecipesComponent,
    CreateRecipeComponent,
    EditRecipeComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ArticleComponent,
    MyArticlesComponent,
    RecipeComponent,
    MyRecipesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    UserService,
    ArticleService,
    RecipeService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
