import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css'
import { UserService } from 'src/app/services/user.service';
import { MomentService } from 'src/app/services/moment.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user
  socket
  notifications = []
  noOfUnreadNotifs = 0
  constructor(
    public tokenService: TokenService,
    public router: Router,
    private userService: UserService,
    private moment: MomentService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    let dropdownEl = document.querySelector('.dropdown-trigger')
    M.Dropdown.init(dropdownEl, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    })
    this.GetUser()
    this.socket.on('refreshPage', () => this.GetUser())
  }
  logout() {
    this.tokenService.deleteToken()
    this.router.navigate([''])
  }
  GetUser() {
    this.userService.getUserById(this.user._id).subscribe((res: any) => {
      this.notifications = res.notifications.reverse()
      this.notifications.forEach(n => n.read ? '' : this.noOfUnreadNotifs += 1)
    })
  } 
  timeFromNow(time) { return this.moment.timeFromNow(time) }

markAll() {
this.userService.MarkAllAsRead().subscribe(() => this.socket.emit('refresh', {}))
}
}
