import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profileService: ProfileService
  ) { }

  private firstName;
  private lastName;
  private dob;
  private gender;
  private userId;

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId");
    document.getElementById("profileImg")['src'] = "assets/images/users/" + this.userId + ".jpg";

    this.profileService.getProfile(this.userId).then(
      response => {
        console.log(response);
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
        this.dob = response['dob'];
        this.gender = response['gender'];
      }
    );

  }

}
