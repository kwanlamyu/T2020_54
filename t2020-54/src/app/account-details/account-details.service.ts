import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  constructor(private http: HttpClient) { }

  accountDetails(accountId: string, startDate: string, endDate: string) {
    console.log('@login Getting user id');
    const url = 'http://192.168.50.103:3000/account-details';

    let params = new HttpParams();
    params = params.append('userId', accountId);
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

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
