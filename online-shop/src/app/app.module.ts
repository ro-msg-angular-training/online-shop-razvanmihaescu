import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';

import { AppComponent } from './app.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleProductComponent,
    ProductsComponent,
    EditProductComponent,
    RoutingComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
