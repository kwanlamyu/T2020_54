import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService : LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin (username: string, pin: string) {
    this.loginService.login(username).then(
      response => {
        this.router.navigateByUrl("/dashboard");
      }, error => {
        alert("Please try again");
      }
    ) ;
    console.log(username, pin);
  }
}
