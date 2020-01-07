import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  dashboard(userId: string) {
    console.log('@dashboard get id');
    const url = 'http://192.168.50.103:3000/dashboard';

    let params = new HttpParams();
    params = params.append('userId', userId);

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, params).subscribe(
          response => {
            console.log('request: ', params);
            console.log('customer Id received');
            console.log(response);
            resolve(response);
          },
          error => {
            console.log('error');
            reject(error);
          });
      }
    );
  }
}
