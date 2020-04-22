import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService {
  url
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    super('messages')
   }
   sendMessage(senderId, recieverId, recieverName, message) {
     return this.http.post(`${this.url}chat-message/${senderId}/${recieverId}`,
      { recieverName, message }, this.setUpHeaders(this.tokenService.getToken())) 
   }
}
