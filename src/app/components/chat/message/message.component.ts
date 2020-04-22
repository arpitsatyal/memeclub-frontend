import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  recieverName
  recieverData
  message
  user
  socket
  messages = []
  constructor(
    private messageService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.recieverName = this.activatedRoute.snapshot.params.name
    this.getUserByName()
  }
  getUserByName() {
    this.userService.getUserByName(this.recieverName).subscribe(res => {
      this.recieverData = res
      this.getAllMessages(this.recieverData._id)
      this.socket.on('refreshPage', () => this.getAllMessages(this.recieverData._id))
    })
  }
  sendMessage() {
    if (this.message) {
      this.messageService.sendMessage(this.recieverData._id, this.recieverName,
        this.message)
        .subscribe(() => {
          this.socket.emit('refresh', {})
          this.message = ''
        })
    }
  }

  getAllMessages(recieverId) {
    this.messageService.getMessages(recieverId).subscribe((res: any) => this.messages = res.message)
  }
}
