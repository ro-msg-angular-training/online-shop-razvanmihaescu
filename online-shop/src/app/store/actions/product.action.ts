import {Action} from '@ngrx/store';
import {Product} from '../../models/Product';

export enum EProductActions {
  GetAllProducts = '[Products] Get Products',
  GetAllProductsSuccess = '[Products] Get Products Success',
  GetProduct = '[Products] Get Product',
  GetProductSuccess = '[Products] Get Product Success'
}

export class GetAllProducts implements Action {
  public readonly type = EProductActions.GetAllProducts;
}

export class GetAllProductsSuccess implements Action {
  public readonly type = EProductActions.GetAllProductsSuccess;
  constructor(public payload: Product[]) {
  }
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {
  }
}

export type ProductActions = GetAllProducts | GetAllProductsSuccess | GetProduct | GetProductSuccess;

