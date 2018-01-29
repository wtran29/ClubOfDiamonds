import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../login/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  users: Array<User>;
  user: object = {firstname:'', email:''};


  constructor(
  	private _authService: AuthService, 
  	private _route: ActivatedRoute, 
  	private _router: Router) { }

  ngOnInit() {
  	console.log('in product.component aka dashboard')
  	console.log('getting session for user');
  	this._authService.currentUser()
  	.then((user)=>{
  		console.log('response back from getting session', user)
  		if(user.errors){
  			console.log('error finding current user:');
  			this._router.navigate(['']);
  		}
  		else{
  			console.log('got session of current user', user);
  			this.user = user;
  		}
  	})
  }
  logout(){
  	console.log('logout product.component aka dashboard');
  	this._authService.logoutUser()
  	.then((logout)=>{
  		if(logout == true){
  			console.log('logged out successfully');
  			this._router.navigate(['']);
  		}
  		else{
  			console.log('error logging out??', logout);
  		}
  	})
  }
}
