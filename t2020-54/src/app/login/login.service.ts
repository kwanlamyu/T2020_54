import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login (userId: string) {
    console.log('@login Getting user id');
    let url = "http://192.168.50.103:3000/login";
    
    let params = new HttpParams();
    params = params.append('userId', userId);

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, params).subscribe(
          response  => {
            console.log("request: ", params);
            console.log("customer Id received");
            console.log(response);
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
