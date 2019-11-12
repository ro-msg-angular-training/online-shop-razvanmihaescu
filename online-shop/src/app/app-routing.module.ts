import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleProductComponent } from './single-product/single-product.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'single/:id',        component: SingleProductComponent },
  { path: 'edit/:id',        component: EditProductComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const 
RoutingComponent = [ProductsComponent,SingleProductComponent,EditProductComponent];
