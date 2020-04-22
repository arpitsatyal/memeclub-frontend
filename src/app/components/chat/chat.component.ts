import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  tabEl
  constructor() { }

  ngOnInit(): void {
    this.tabEl = document.querySelector('.nav-content')
  }
  ngAfterViewInit() {
    this.tabEl.style.display = 'none'
  }
}
