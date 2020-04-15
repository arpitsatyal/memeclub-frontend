import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent implements OnInit {
  postForm: FormGroup
  socket
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      post: ['', Validators.required]
    })
  }
  createPost(){
    this.postService.createPost(this.postForm.value).subscribe(res => {
      this.socket.emit('refresh', {})
      this.postForm.reset()
    }, err => {
      console.log(err)
    })
  }
}
