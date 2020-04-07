import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  token: any
  constructor(
    public tokenService: TokenService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.tokenService.getToken())
  }
  logout() {
    this.tokenService.deleteToken()
    this.router.navigate([''])
  }
}
