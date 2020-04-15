import { Injectable } from "@angular/core";
import {CookieService} from 'ngx-cookie-service'

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    constructor(
        private cookieService: CookieService
    ) {
    }

    setToken(token) {
        this.cookieService.set('token', token)
    }
    getToken() {
        return this.cookieService.get('token')
    }
    deleteToken() {
        return this.cookieService.delete('token')
    }
    GetPayload() {
        let token =  this.getToken()
        let payload 
        if(token) {
            payload = token.split('.')[1]
            payload = JSON.parse(window.atob(payload))
            // atob used to decrypt the data
        }
        return payload.user
    }
}