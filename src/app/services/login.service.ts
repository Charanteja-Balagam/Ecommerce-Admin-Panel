import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:3001/login";
  constructor(private http:HttpClient) { }


isLogedIn = new BehaviorSubject<Boolean>(false);
loginUser(data:any){

  return this.http.post(this.url, data)
}
}
