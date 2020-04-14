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
}
