import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule, RoutingComponent} from './app-routing.module';
import {MatSliderModule} from '@angular/material/slider';

import {AppComponent} from './app.component';
import {SingleProductComponent} from './components/single-product/single-product.component';
import {ProductsComponent} from './components/products/products.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {RoleGuard} from './guards/role-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBadgeModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule} from '@angular/material';
import {EffectsModule} from '@ngrx/effects';
import {ProductEffects} from './store/effects/product.effect';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/reducers/app.reducer';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";

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
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatSliderModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatTabsModule,
    MatButtonModule,
  ],
  providers: [AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
