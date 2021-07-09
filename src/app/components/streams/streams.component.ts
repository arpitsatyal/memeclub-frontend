import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'
import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service'
import { MomentService } from 'src/app/services/moment.service'
import { PageEvent } from '@angular/material/paginator';
import * as M from 'materialize-css'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { FileUploader } from 'ng2-file-upload';

let URL = environment.backendUrl + 'upload-image'
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  socket
  uploader: FileUploader = new FileUploader({ url: URL, disableMultipart: true })
  posts
  user
  editForm: FormGroup
  clickedPost
  modalEl
  selectedFile
  streams = false
  topStreams = false
  totalPosts = 0
  postsPerPage= 3
  currentPage = 1
  pageSizeOptions = [3,6,9,12]

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private moment: MomentService,
    private formBuilder: FormBuilder
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.streams = true
    let tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs, {})
    this.modalEl = document.querySelector('.modal')
    M.Modal.init(this.modalEl, {})
    this.user = this.tokenService.GetPayload()
    this.AllPosts()
    this.socket.on('refreshPage', () => this.AllPosts())
    this.initEditForm()
  }
  changeTabs(val) {
    if(val === 'streams') {
      this.streams = true
      this.topStreams = false
    }
    if(val === 'top') {
      this.streams = false
      this.topStreams = true
    }
  }
  initEditForm() {
    this.editForm = this.formBuilder.group({
      editedPost: ['', Validators.required]
    })
  }
  AllPosts() {
    this.postService.getAllPosts(this.postsPerPage, this.currentPage).subscribe((res: any) => {
      this.posts = res.all
      this.totalPosts = res.totalPosts
    })
  }
  
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1
    this.postService.getAllPosts(this.postsPerPage, this.currentPage)
    .subscribe((res: any) => {
      this.posts = res.all
    }, err => console.log(err))
  }

  timeFromNow(time) { 
    return this.moment.timeFromNow(time) }

  like(post) {
    this.postService.addLike(post).subscribe(() =>  this.socket.emit('refresh', {}), err => console.log(err))
  }

  checkInLikesArray(arr, username) {
    return _.some(arr, { username })
  }
  openEditModal(post) {
    this.clickedPost = post
    console.log('clicked post', this.clickedPost)

  }
  readAsBase64(file) {
    let reader = new FileReader()
    return new Promise((res, rej) => {
      reader.addEventListener('load', () => res(reader.result))
      reader.addEventListener('error', e => rej(e))
      reader.readAsDataURL(file)
    })
  }

  onFileSelected(e) {
    let file: File = e[0]
    this.readAsBase64(file)
    .then(result => this.selectedFile = result)
    .catch(e => console.log(e))
  }
  submitPost() {
    let body
    if(!this.selectedFile) {
      body = {
        PostId: this.clickedPost._id,
        post: this.editForm.value.editedPost 
      }
    } else {
      body = {
        PostId: this.clickedPost._id,
        post: this.editForm.value.editedPost,
        image: this.selectedFile
      }
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
