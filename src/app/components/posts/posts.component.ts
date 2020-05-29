import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';
import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket
  posts
  user
  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private moment: MomentService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.AllPosts()
    this.socket.on('refreshPage', () => this.AllPosts())
  }
  AllPosts() {
    this.postService.getAllPosts().subscribe((res: any) => {
      console.log(res)
      this.posts = res.all
    })
  }
  timeFromNow(time) { return this.moment.timeFromNow(time) }

  like(post) {
    this.postService.addLike(post).subscribe(() =>  this.socket.emit('refresh', {}), err => console.log(err))
  }

  checkInLikesArray(arr, username) {
    return _.some(arr, { username })
  }
}
