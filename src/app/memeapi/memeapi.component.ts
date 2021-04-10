import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-memeapi',
  templateUrl: './memeapi.component.html',
  styleUrls: ['./memeapi.component.css']
})
export class MemeapiComponent implements OnInit {
  apiImgs = []
  constructor(private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit(): void {
    this.meme()

  }
  async meme() {
  	let data = await fetch('https://api.imgflip.com/get_memes')
  	await data.json().then(response => {
      console.log(response.data.memes)
     response.data.memes.forEach(m => {
    
      this.apiImgs.push(m.url)
     })
      
      this.ng2ImgMax.resize(this.apiImgs, 400, 300).subscribe(
        result => {
          console.log('res', result)
        },
        error => {
          console.log('😢 Oh no!', error);
        }
      );
    })
  }
}
