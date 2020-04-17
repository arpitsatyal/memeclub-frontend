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
}