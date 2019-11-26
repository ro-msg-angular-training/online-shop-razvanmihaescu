import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleProductComponent} from './components/single-product/single-product.component';
import {ProductsComponent} from './components/products/products.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {RoleGuard} from './guards/role-guard.service';


const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {path: 'single/:id', component: SingleProductComponent, canActivate: [AuthGuard]},
  {
    path: 'edit/:id', component: EditProductComponent, canActivate: [AuthGuard, RoleGuard],
    data: {allowedRoles: ['admin']}
  },
  {
    path: 'add', component: AddProductComponent, canActivate: [AuthGuard, RoleGuard],
    data: {allowedRoles: ['admin']}
  },
  {path: 'shoppingcart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const
  RoutingComponent = [ProductsComponent, SingleProductComponent, EditProductComponent];
