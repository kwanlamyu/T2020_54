import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient) { }

  getProfile (userId: string) {
    console.log('@profile Getting user profile');
    let url = "http://192.168.50.103:3000/profile";

    let params = new HttpParams();
    params = params.append('customerId', userId);

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, params).subscribe(
          response => {
            console.log(response);
            if (response) {
              resolve(response);
            } else {
              alert("Error loading profile");
            }
          },
          error=> {
            console.log("error");
            reject(error);
          })
      }
    )
  }
}
