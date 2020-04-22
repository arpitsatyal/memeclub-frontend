import { Injectable } from "@angular/core";
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()

export class UserService extends BaseService {
    url
    constructor(
        private http: HttpClient,
        private tokenSerivce: TokenService
    ){
        super
        ('users')
    }

    getAllUsers() {
        return this.http.get(this.url + 'get-users', this.setUpHeaders(this.tokenSerivce.getToken()))
    }
    follow(userFollowed) {
        return this.http.post(this.url + 'follow/',{ userId: userFollowed }, this.setUpHeaders(this.tokenSerivce.getToken()))
    }
    Unfollow(userUnfollowed) {
        return this.http.post(this.url + 'Unfollow/',{ userId: userUnfollowed }, this.setUpHeaders(this.tokenSerivce.getToken()))
    }
    getUserById(id) {
        return this.http.get(this.url + 'get-user/' + id, this.setUpHeaders(this.tokenSerivce.getToken()))       
    }
    getUserByName(username) {
        return this.http.get(this.url + 'get-userByName/' + username, this.setUpHeaders(this.tokenSerivce.getToken()))       
    }
    MarkNotification(id, deleteVal?) {
        return this.http.post(this.url + 'mark/' + id, { id, deleteVal },this.setUpHeaders(this.tokenSerivce.getToken()))
    }
    MarkAllAsRead() {
        return this.http.post(this.url + 'mark-all', {}, this.setUpHeaders(this.tokenSerivce.getToken()))
    }
}