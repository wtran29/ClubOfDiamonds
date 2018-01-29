import { Component, OnInit } from '@angular/core';
import { User } from '../login/user';
import { Product } from '../product/product';
import { AuthService } from '../login/auth.service';
import { ProductService } from '../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EqualValidatorDirective } from '../equal-validator.directive';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  newUser: object = {firstname: '', lastname: '', email: '', password: '', confirm: '', phone: '', gender: ''};
  user: object = {email: '', password: ''};
  regErr: String;
  loginErr: String;
  display = 'none';
  backdrop;
  featuredProduct: Product = new Product();

  constructor(
  	private _authService: AuthService, 
  	private _router: Router, 
  	private _activatedRouter: ActivatedRoute, 
  	private _productService: ProductService
  	
  	) {

    _productService.featuredProduct()
    .then((randomProduct)=>{
      this.featuredProduct = randomProduct;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  openModal(){
  	this.display = 'block';
  	this.backdrop = 'static';
  }
  
  onCloseHandled(){
  	this.display = 'none';
  }

  ngOnInit() {

  }

  // registration
  register(){
  	console.log('register login.component',this.newUser);
  	this._authService.registerUser(this.newUser)
  	.then((user)=> {
  		if(user.errors){
  			console.log('errors registering');
  			this.regErr = 'Register error';
  		}
  		else{
  			console.log('registered user', user)
  	 		this._router.navigate(['/dashboard/browse']);
  		}
  	})
  	.catch((err)=> {
  		this.regErr = 'Email already exists!';
  	})
  }
  
  login(){
  	console.log('login login.component', this.user);
  	this._authService.loginUser(this.user)
  	.then((user) => { this._router.navigate(['/dashboard']); })
    .catch((err) => { 
      if (err.status == '401') {
        this.loginErr = "User email not found.";
      }
      else if (err.status == '402') {
        this.loginErr = "Invalid email and password.";
      }
    })
  }
}
