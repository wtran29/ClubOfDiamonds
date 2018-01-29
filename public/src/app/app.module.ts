import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ProductBrowseComponent } from './product/product-browse/product-browse.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';

import { AuthService } from './login/auth.service';
import { ProductService } from './product/product.service';
import { FilterPipe } from './filter.pipe';
import { EqualValidatorDirective } from './equal-validator.directive';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LoginComponent,
    ProductBrowseComponent,
    ProductListingComponent,
    FilterPipe,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule
  ],
  providers: [AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
