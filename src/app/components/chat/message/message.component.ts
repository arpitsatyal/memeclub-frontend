import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  recieverName
  recieverData
  sender
  message
  constructor(
    private tokenService: TokenService,
    private messageService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.sender = this.tokenService.GetPayload()
    this.recieverName = this.activatedRoute.snapshot.params.name
    this.getUserByName()
  }
  getUserByName() {
    this.userService.getUserByName(this.recieverName).subscribe(res => this.recieverData = res)
  }
  sendMessage() {
    this.messageService.sendMessage(this.sender._id, this.recieverData._id, this.recieverName,
      this.message)
      .subscribe(res => {
        console.log(res)
      })
  }
}
