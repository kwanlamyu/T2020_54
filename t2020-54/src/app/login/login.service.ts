import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  private userId;
  private userName;

  login (username: string) {
    console.log('@login Getting user id');
    let url = "http://192.168.50.103:3000/login";

    let params = new HttpParams();
    params = params.append('userId', username);

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, params).subscribe(
          response => {
            console.log(response);
            if (response && response['customerId']!==null) {
              this.userId = response['customerId'];
              this.userName = response['userName'];
              this.createUserSession();
              resolve(response);
            } else {
              alert("Please try again");
            }
          },
          error=> {
            console.log("error");
            reject(error);
          })
      }
    )
  }

  createUserSession(){
    console.log('@login: creating user session');

    sessionStorage.setItem("userId", this.userId);
    sessionStorage.setItem("userName", this.userName);

  }
}
