import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  chatList = []
  noOfUnreadNotifs = 0
  noOfUnreadMsg = 0
  lastMsg
  url
  reciever
  constructor(
    public tokenService: TokenService,
    public router: Router,
    private userService: UserService,
    private moment: MomentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.url = this.router.url
    this.reciever = `/chat/${this.activatedRoute.snapshot.params.name}`
    this.user = this.tokenService.GetPayload()
    let dropdownEl = document.querySelectorAll('.dropdown-trigger')
    M.Dropdown.init(dropdownEl, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    })

    let dropdownEl2 = document.querySelectorAll('.dropdown-trigger1')
    M.Dropdown.init(dropdownEl2, {
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
      this.chatList = res.chatList
      this.checkIfRead(this.chatList).then(res => {
        this.lastMsg = res
       this.lastMsg.isRead ? '' : this.noOfUnreadMsg += 1
      })
    })
  }

  checkIfRead(arr) {
    return new Promise((res, rej) => {
       arr.forEach(el => {
      el.messageId.message.forEach((e, i) => {
        if(i === el.messageId.message.length -1) res(e)
      })
    })
    })
   
  }
  timeFromNow(time) { return this.moment.timeFromNow(time) }

  markAll() {
    this.userService.MarkAllAsRead().subscribe(() => this.socket.emit('refresh', {}))
  }
  messageDate(date) { return this.moment.messageDate(date) }
}
