import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = []
  me
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.GetUsers()
    this.me = this.tokenService.GetPayload()
  }
  GetUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.filter(user => user.username !== this.me.username)
    })
  }
}
