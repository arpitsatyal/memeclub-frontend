import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as M from 'materialize-css'
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  tabEl
  postsTab = false
  followingTab = false
  followersTab = false
  posts = []
  following = []
  followers = []
  user
  userData
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private moment: MomentService
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.params.name
    this.GetUser(this.user)
    this.postsTab = true
    let tabs = document.querySelector('.tabs')
    M.tabs.init(tabs, {})
    this.tabEl =  document.querySelector('.nav-content')
  }
  ngAfterViewInit() {
    this.tabEl.style.display = 'none'
  }
  GetUser(name) {
    this.userService.getUserByName(name).subscribe((res: any) => {
      this.posts = res.posts.reverse()
      this.following = res.following
      this.followers = res.followers
      this.userData = res
    })
  }

  changeTab(val) {
    if(val === 'posts') {
      this.postsTab = true
      this.followersTab = false
      this.followingTab = false
    }
    if(val === 'following') {
      this.postsTab = false
      this.followersTab = false
      this.followingTab = true
    } 
    if(val === 'followers') {
      this.postsTab = false
      this.followersTab = true
      this.followingTab = false
    } 
  }
  timeFromNow(time) {
    return this.moment.timeFromNow(time)
  }
}
