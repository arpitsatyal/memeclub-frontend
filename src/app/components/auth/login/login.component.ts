import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loader = false
  errorMsg
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.init()
  }

    init() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }

    login() {
      this.loader = true
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        this.tokenService.setToken(res.token)
        setTimeout(() => {
            this.router.navigate(['/streams'])
        }, 2000)
      }, err => {
        this.loader = false
        this.errorMsg = err.error
      })
    }
}
