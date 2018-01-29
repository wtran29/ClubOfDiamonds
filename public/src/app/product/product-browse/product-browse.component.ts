import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../../login/auth.service';
import { Product } from '../product';
import { User } from '../../login/user';


@Component({
  selector: 'app-product-browse',
  templateUrl: './product-browse.component.html',
  styleUrls: ['./product-browse.component.css']
})
export class ProductBrowseComponent implements OnInit {
	allProducts: Array<Product>;
	user: string;
	searchStr: string = '';
  productInfo = { title: '', price: ''};
	contact = { firstname: '', lastname: '', agent:'', email: '', phone: '', createdAt: ''};
	display = 'none';

  constructor(
  	private _authService: AuthService,
  	private _productService: ProductService, 
  	private _route: ActivatedRoute,
  	private _router: Router) {

  	this.contact.createdAt = '';
  	this.contact.firstname = '';
  	this.contact.lastname = '';
  	this.contact.phone = '';
  	this.contact.email = '';

    this.productInfo.title = '';
    this.productInfo.price = '';

  }

  ngOnInit() {
  	this.index();
  	this._authService.currentUser()
  	.then((user)=>{
  		// user._id is the represented as the user who created product
  		this.user = user._id;
  	})
  	.catch((err)=>{
  		console.log(err);
  	})
  }

  index(){
  	this._productService.allProducts()
  	.then((allProducts)=>{
  		this.allProducts = allProducts;
  	})
  }

  getContact(product_user,product){
  	this._authService.contactInfo({id: product_user})
  	.then((contactInfo)=>{
  		this.contact.firstname = contactInfo.firstname;
  		this.contact.lastname = contactInfo.lastname;
  		this.contact.agent = contactInfo.agent;
  		this.contact.phone = contactInfo.phone;
  		this.contact.email = contactInfo.email;
  		this.contact.createdAt = contactInfo.createdAt;
  		let modal = document.getElementById('contactModal');
  		modal.style.display = "block";
  	})
  	.catch((err)=> console.log('errors',err));
  	this._productService.productInfo(product)
    .then((productInfo)=>{
      this.productInfo.title = productInfo.title;
      this.productInfo.price = productInfo.price;
    })
    .catch((err)=> console.log('errors', err));
  }


  closeModal(){
  	let modal = document.getElementById('contactModal');
  	modal.style.display = 'none';
  }

  delete(product){
  	this._productService.deleteProduct(product)
  	.then((deletedProduct)=>{
  		console.log('deleted the listing');
  		this.index();
  	})
  }
}
