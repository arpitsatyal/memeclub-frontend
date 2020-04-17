import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment'
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
toolbarEl
post = []
comments
socket
currentPost
commentGroup: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {
    this.socket = io(environment.server)
   }

  ngOnInit(): void {
    this.toolbarEl = document.querySelector('.nav-content')
    this.commentGroup = this.formBuilder.group({
      comment: ['',Validators.required ]
    })
    this.post = this.activatedRoute.snapshot.params.id
    this.getPost()
    this.socket.on('refreshPage', () => this.getPost())
  }
  ngAfterViewInit() {
    this.toolbarEl.style.display = 'none'
  }
  commentIt() {
    this.postService.addComment(this.commentGroup.value, this.post).subscribe(res => {
      this.commentGroup.reset()
   this.socket.emit('refresh', {})
    }, err => console.log(err))
  }
  getPost() {
    this.postService.getPost(this.post).subscribe((res: any) =>{
      console.log(res)
      this.comments = res.comments.reverse()
      this.currentPost = res.post
    }, err => console.log(err) )
  }
  timeFromNow(time) {
    return moment(time).fromNow()
  }
}
