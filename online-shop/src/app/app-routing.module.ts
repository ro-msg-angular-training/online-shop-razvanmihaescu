import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { AddProductComponent } from './components/add-product/add-product.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'single/:id',        component: SingleProductComponent },
  { path: 'edit/:id',        component: EditProductComponent },
  { path: 'add',        component: AddProductComponent },
  { path: 'shoppingcart',        component: ShoppingCartComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const 
RoutingComponent = [ProductsComponent,SingleProductComponent,EditProductComponent];
