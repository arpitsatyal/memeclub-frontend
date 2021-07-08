import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-memeapi',
  templateUrl: './memeapi.component.html',
  styleUrls: ['./memeapi.component.css']
})
export class MemeapiComponent implements OnInit {
  apiImgs = []
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages()
  }
 getImages() {
   this.imageService.apiMeme().subscribe((response:any) => this.apiImgs = response.apiImgs, err => console.log(err))
 }
}
