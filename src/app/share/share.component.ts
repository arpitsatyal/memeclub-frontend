import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
@Component({
  selector: 'facebook-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class FacebookShareComponent implements OnInit {

  shareCounter: number = 0;

  constructor(private fb: FacebookService, private http: HttpClient) {
    const initParams: InitParams = {
      appId: '354842102629345',
      xfbml: true,
      version: 'v3.1'
    };
    fb.init(initParams);
  }

  share() {
    this.fb.ui({
      method: 'share',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': 'https://mdbootstrap.com/docs/angular',
          'og:title': 'My favorite Angular site!',
          'og:site_name': 'This is my Angular share function',
          'og:description': 'This is share from my favorite Angular site!',
        }
      })
    }).then((data: any) => {
      console.log(data);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  ngOnInit() {
    const httpUrl = 'http://www.mdbootstrap.com';

    this.http.get('https://graph.facebook.com/?ids=' + `${httpUrl}`).subscribe((data: any) => {
      this.shareCounter = data.json()[`${httpUrl}`].share.share_count;
    });
  }
}