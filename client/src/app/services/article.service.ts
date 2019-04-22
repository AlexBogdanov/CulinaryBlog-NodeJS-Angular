import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ArticleModel } from './../models/article.model';
import { Constants } from './../constants/constants';

// URLs
const createArticleUrl = `${Constants.common.SERVER_BASE_PATH}/article/create`;
const getArticleByIdUrl = `${Constants.common.SERVER_BASE_PATH}/article/get/`;
const getAllArticlesUrl = `${Constants.common.SERVER_BASE_PATH}/article/all`;
const editArticleUrl = `${Constants.common.SERVER_BASE_PATH}/article/edit`;
const deleteArticleUrl = `${Constants.common.SERVER_BASE_PATH}/article/delete/`;
const getUserArticlesUrl = `${Constants.common.SERVER_BASE_PATH}/article/userArticles`;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _http: HttpClient) { }

  createArticle(article: ArticleModel): Observable<any> {
    return this._http.post(createArticleUrl, article);
  }

  getArticleById(id: string): Observable<any> {
    return this._http.get(getArticleByIdUrl + id);
  }

  getAllArticles(): Observable<any> {
    return this._http.get(getAllArticlesUrl);
  }

  editArticle(articleId: string, article: any): Observable<any> {
    return this._http.put(editArticleUrl, { articleId, article });
  }

  deleteArticle(articleId: string): Observable<any> {
    return this._http.delete(deleteArticleUrl + articleId);
  }

  getUserArticles(): Observable<any> {
    return this._http.get(getUserArticlesUrl);
  }

}
