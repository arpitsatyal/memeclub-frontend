import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
toolbarEl
post
commentGroup: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.toolbarEl = document.querySelector('.nav-content')
    this.commentGroup = this.formBuilder.group({
      comment: ['',Validators.required ]
    })
    this.post = this.activatedRoute.snapshot.params.id
  }
  ngAfterViewInit() {
    this.toolbarEl.style.display = 'none'
  }
  commentIt() {
    this.postService.addComment(this.commentGroup.value, this.post).subscribe(res => {
      this.commentGroup.reset()
    }, err => console.log(err))
  }
}
