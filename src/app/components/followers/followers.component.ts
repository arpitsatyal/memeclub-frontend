import { Component, OnInit } from "@angular/core";
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html'
})

export class followersComponent implements OnInit {
  followers = []
  user
  socket
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.socket = io(environment.server)
  }
  ngOnInit() {
    this.user = this.tokenService.GetPayload()
    this.GetUser()
    this.socket.on('refreshPage', () => this.GetUser())
  }

  GetUser() {
    this.userService.getUserById(this.user._id).subscribe((res: any) => this.followers = res.followers)
  }
  Follow(user) {
    this.userService.follow(user).subscribe(() => this.socket.emit('refresh', {}), err => console.log(err))
  }
}