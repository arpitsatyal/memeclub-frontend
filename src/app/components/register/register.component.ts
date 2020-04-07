import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  errorMsg
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }
  register() {
    this.authService.register(this.registerForm.value).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
      this.errorMsg = err.error
    })
  }
}
