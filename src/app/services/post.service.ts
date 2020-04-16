import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
url
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { 
    super('posts')
  }
  createPost(post) {
    return this.http.post(this.url + 'add-post', post, this.setUpHeaders(this.tokenService.getToken()))
  }
  getAllPosts() {
    return this.http.get(this.url + 'posts', this.setUpHeaders(this.tokenService.getToken()))
  }
  addLike(id) {
    return this.http.post(this.url + 'add-like',id , this.setUpHeaders(this.tokenService.getToken()))
  }
  addComment(comment, postId) {
    return this.http.post(this.url + 'add-comment/' + postId ,comment, this.setUpHeaders(this.tokenService.getToken()))
  }
}