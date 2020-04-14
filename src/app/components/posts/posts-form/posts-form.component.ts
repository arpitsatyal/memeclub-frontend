import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent implements OnInit {
  postForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      post: ['', Validators.required]
    })
  }
  createPost(){
    this.postService.createPost(this.postForm.value).subscribe(res => {
      console.log(res)
      this.postForm.reset()
    }, err => {
      console.log(err)
    })
  }
}
