import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  users = []
  noOfPosts
  me
  constructor(
    private userService: UserService,
    private tokenService: TokenService

  ) { 
  }

  ngOnInit(): void {
    this.getNoPost()
    this.me = this.tokenService.GetPayload()
  }
  getNoPost() {
    this.userService.getAllUsers().subscribe((res: any) => {
    this.users = res
    this.users.forEach(user =>{
      if(user.username === this.me.username) this.noOfPosts = user.posts.length
    })
    } )
  }
}
