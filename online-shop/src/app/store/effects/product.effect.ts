import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {EProductActions, GetAllProducts} from '../actions/product.action';
import {ProductService} from '../../services/product.service';
import {map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductEffects {

  @Effect()
  getProducts = createEffect(() => this.actions$.pipe(
    ofType(EProductActions.GetAllProducts),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(products => ({type: EProductActions.GetAllProductsSuccess, payload: products}),
        ))
    ))
  );

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
