import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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
    if (!username || !pin) {
      alert("Please enter username and pin");
    } else {
      this.loginService.login(username).then(
        response => {
          this.router.navigateByUrl("/dashboard");
        }
      );
    }
  }
}
