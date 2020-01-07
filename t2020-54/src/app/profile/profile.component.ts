import { Component, OnInit } from '@angular/core';
import { UserSession } from '../UserSession';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  private firstName;
  private lastName;
  private dob;
  private gender;
  private userId;

  ngOnInit() {
    this.userId = UserSession.userId;
    document.getElementById("profileImg")['src'] = "assets/images/users/" + this.userId + ".jpg";
  }

}
