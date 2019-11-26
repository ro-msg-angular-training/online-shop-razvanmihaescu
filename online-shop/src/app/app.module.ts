import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, RoutingComponent} from './app-routing.module';

import {AppComponent} from './app.component';
import {SingleProductComponent} from './components/single-product/single-product.component';
import {ProductsComponent} from './components/products/products.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {RoleGuard} from './guards/role-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SingleProductComponent,
    ProductsComponent,
    EditProductComponent,
    RoutingComponent,
    ShoppingCartComponent,
    AddProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
