import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket
  posts: any
  constructor(
    private postService: PostService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.AllPosts()
    this.socket.on('refreshPage', () => this.AllPosts())
  }
  AllPosts() {
    this.postService.getAllPosts().subscribe((posts: any) =>{
      this.posts = posts
    }, err => {
      console.log(err)
    })
  }
  timeFromNow(time) {
    return moment(time).fromNow()
  }
  like(post) {
    this.postService.addLike(post).subscribe(res => {
      this.socket.emit('refresh', {})
    }, err => console.log(err))
  }
}
