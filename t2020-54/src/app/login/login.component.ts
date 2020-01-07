import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService : LoginService,
  ) { }

  ngOnInit() {
  }

  onLogin (username: string, pin: string) {
    this.loginService.login(username);
    console.log(username, pin);
  }
}
