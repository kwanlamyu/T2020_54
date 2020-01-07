import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor( private router: Router) { }

  private r = this.router.url;

  onProfile () {
    console.log("Go to profile");
    this.router.navigateByUrl("/profile");
  }

  onSignOut () {
    console.log("Signing out");
    sessionStorage.setItem("userId", null);
    sessionStorage.setItem("userName", null);
    sessionStorage.setItem("accountId", null);
    this.router.navigateByUrl("/login");
  }
}
