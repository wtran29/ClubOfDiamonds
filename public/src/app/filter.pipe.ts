import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<Product>, searchStr: string): Array<Product> {
    if(value == undefined){
    	return null;
    }
    return value.filter(product=>{
    	return product.title.toLowerCase().includes(searchStr.toLowerCase()) ||
    	product.description.toLowerCase().includes(searchStr.toLowerCase()) ||
      product.highlights.toLowerCase().includes(searchStr.toLowerCase()) ||
      product.location.toLowerCase().includes(searchStr.toLowerCase())
    });
  }

}
