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
const getarticlesByUserIdUrl = `${Constants.common.SERVER_BASE_PATH}/article/articles/`;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  createArticle(article: ArticleModel): Observable<any> {
    return this.http.post(createArticleUrl, article);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get(getArticleByIdUrl + id);
  }

  getAllArticles(): Observable<any> {
    return this.http.get(getAllArticlesUrl);
  }

  editArticle(articleId: string, article: any): Observable<any> {
    return this.http.put(editArticleUrl, { articleId, article });
  }

  deleteArticle(articleId: string): Observable<any> {
    return this.http.delete(deleteArticleUrl + articleId);
  }

  getArticlesByUserId(userId: string): Observable<any> {
    return this.http.get(getarticlesByUserIdUrl + userId);
  }

}
