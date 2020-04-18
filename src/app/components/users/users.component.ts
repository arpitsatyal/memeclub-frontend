import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import _ from 'lodash'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users = []
  me: any
  arr = []
  socket
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.me = this.tokenService.GetPayload()
    this.GetUsers()
    this.GetUsersById()
    this.socket.on('refreshPage', () => {
      this.GetUsers()
      this.GetUsersById()
    })
  }
  GetUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.filter(user => user.username !== this.me.username)
    })
  }

  GetUsersById() {
    this.userService.getUserById(this.me._id).subscribe((data: any) => {
      console.log(data)
      this.arr = data.following })
  }

  follow(userman) {
    this.userService.follow(userman).subscribe(() => this.socket.emit('refresh', {}) )
  }

 checkInArray(arr, id) {
   let result = _.find(arr, ['userFollowed', id])
   if(result) return true
     return false
 }
}