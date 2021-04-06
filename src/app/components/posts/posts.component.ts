import { Component, OnInit } from '@angular/core'
import { PostService } from 'src/app/services/post.service'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'
import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service'
import { MomentService } from 'src/app/services/moment.service'
import * as M from 'materialize-css'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket
  posts
  user
  editForm: FormGroup
  clickedPost
  modalEl
  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private moment: MomentService,
    private formBuilder: FormBuilder
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
     this.modalEl = document.querySelector('.modal')
    M.Modal.init(this.modalEl, {})
    this.user = this.tokenService.GetPayload()
    this.AllPosts()
    this.socket.on('refreshPage', () => this.AllPosts())
    this.initEditForm()
  }
  initEditForm() {
    this.editForm = this.formBuilder.group({
      editedPost: ['', Validators.required]
    })
  }
  AllPosts() {
    this.postService.getAllPosts().subscribe((res: any) => this.posts = res.all)
  }

  timeFromNow(time) { return this.moment.timeFromNow(time) }

  like(post) {
    this.postService.addLike(post).subscribe(() =>  this.socket.emit('refresh', {}), err => console.log(err))
  }

  checkInLikesArray(arr, username) {
    return _.some(arr, { username })
  }
  openEditModal(post) {
    this.clickedPost = post
  }
  submitPost() {
    let body = {
      id: this.clickedPost._id,
      post: this.editForm.value.editedPost 
    }
    this.postService.editPost(body).subscribe(() => {
      this.socket.emit('refresh', {})
      M.Modal.getInstance(this.modalEl).close()
      this.editForm.reset()
    })
  }
  deletePost() {
    this.postService.deletePost(this.clickedPost._id).subscribe(() => {
      M.Modal.getInstance(this.modalEl).close()
      this.socket.emit('refresh', {})
    })
  }
  close() {
    this.editForm.reset()
    M.Modal.getInstance(this.modalEl).close()
  }
}
