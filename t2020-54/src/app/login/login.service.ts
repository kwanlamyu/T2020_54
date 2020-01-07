import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login (userId: string) {
    console.log('@login Getting user id');
    let url = "http://192.168.50.103:3000/customerId";
    let request = {
      userId: userId
    }
    return new Promise(
      (resolve, reject) => {
        this.http.post(url, request).subscribe(
          (response : any) => {
            console.log("customer Id " + response);
            resolve(response);
          },
          error=> {
            console.log("error");
            reject(error);
          })
      }
    )
  }
}
