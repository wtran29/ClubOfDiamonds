import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  // productsObservable = new BehaviorSubject([]);
  constructor(private _http: Http) { }
  
  productByUser(){
  	return this._http.get('/products/userproducts')
  	.map((res)=>res.json())
  	.toPromise();
  }

  createProduct(product){
  	return this._http.post('/products/create', product)
  	.map((res)=> res.json())
  	.toPromise();
  }

  updateProduct(product){
  	return this._http.post('/products/update', product)
  	.map((res)=> res.json())
  	.toPromise();
  }

  deleteProduct(product){
  	return this._http.post('/products/delete', product)
  	.map((res)=> res.json())
  	.toPromise();
  }

  allProducts(){
  	return this._http.get('/products/index')
  	.map((res)=> res.json())
  	.toPromise();
  }

  featuredProduct(){
    return this._http.get('/products/featured')
    .map((res)=> res.json())
    .toPromise();
  }

  productInfo(product){
    return this._http.post('/products/info', product)
    .map((res)=> res.json())
    .toPromise();
  }
}
