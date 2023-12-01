import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
    console.log('Constructer');
  }

  getUsers() {
    return this.httpClient.get(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    );
  }
}
