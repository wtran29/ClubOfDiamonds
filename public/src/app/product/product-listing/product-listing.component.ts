import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../login/user';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  newProduct: Product = new Product();
  products: Array<Product>;
  

  constructor(
  	private _productService: ProductService, 
  	private _route:ActivatedRoute, 
  	private _router: Router) { }

  ngOnInit() {
  	this.userProducts();
  }
  userProducts(){
  	console.log('in product-listing.component');
  	this._productService.productByUser()
  	.then((products)=>{
  		if(products.errors){
  			console.log(products.errors);
  		}
  		else{
  			console.log('retrieved products listed by user', products);
  			this.products = products;
  		}
  	})
  }
  create(){
  	console.log('in product-listing.component');
  	this._productService.createProduct(this.newProduct)
  	.then((product)=>{
  		if(product.errors){
  			console.log(product.errors);
  		}
  		else{
  			console.log('created product listing');
  			this.userProducts();
  			
  		}
  	})

  }


  update(idx){
  	console.log('in product-listing.component');
  	this._productService.updateProduct(this.products[idx])
  	.then((updatedProduct)=>{
  		if(updatedProduct.errors){
  			console.log('errror updating',updatedProduct.errors);
  		}
  		else{
  			console.log('updated product listing');
  			this.userProducts();
  		}
  	})
  }
  delete(idx){
  	console.log('in product-listing.component');
  	console.log('idx:',idx);
  	console.log(this.products);
  	this._productService.deleteProduct(this.products[idx])
  	.then((removedProduct)=>{
  		if(removedProduct.errors){
  			console.log(removedProduct.errors);

  		}
  		else{
  			console.log('removed listing successfully');
  			this.userProducts();
  		}
  	})
  }

}
