import { Injectable } from '@angular/core';
import { User } from '../login/user';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  // usersObservable = new BehaviorSubject([]);
  constructor(private _http: Http) { }
  
  registerUser(user){
  	return this._http.post('/users/register', user)
  	.map((res)=> res.json())
  	.toPromise();
  }

  currentUser(){
  	return this._http.get('/users/current')
  	.map((res)=> res.json())
  	.toPromise();
  }

  logoutUser(){
  	return this._http.get('/users/logout')
  	.map((res)=> res.json())
  	.toPromise();
  }

  loginUser(user){
  	return this._http.post('/users/login',user)
  	.map((res)=> res.json())
  	.toPromise();
  }

  contactInfo(product_user){
  	return this._http.post('/users/contact', product_user)
  	.map((res)=> res.json())
  	.toPromise();
  }

}
