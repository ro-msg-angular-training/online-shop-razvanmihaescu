import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {DeleteProduct, EProductActions, GetProduct} from '../actions/product.action';
import {ProductService} from '../../services/product.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
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

  @Effect()
  getProduct = createEffect(() => this.actions$.pipe(
    ofType<GetProduct>(EProductActions.GetProduct),
    switchMap((action) => this.productService.getProductById(action.id)
      .pipe(
        map(product => ({type: EProductActions.GetProductSuccess, payload: product}),
        ))
    ))
  );

  @Effect()
  deleteProduct = createEffect(() => this.actions$.pipe(
    ofType<DeleteProduct>(EProductActions.DeleteProduct),
    switchMap((action) => this.productService.deleteProduct(action.id)
      .pipe(
        map(product => ({type: EProductActions.DeleteProduct}),
        ))
    ))
  );

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
