import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { ProductComponent } from './product/product.component';
import { ProductBrowseComponent } from './product/product-browse/product-browse.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		redirectTo: '/dashboard/listings',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: ProductComponent,
		children: [
			{
				path: 'browse',
				component: ProductBrowseComponent,
			},
			{
				path: 'listings',
				component: ProductListingComponent,
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
