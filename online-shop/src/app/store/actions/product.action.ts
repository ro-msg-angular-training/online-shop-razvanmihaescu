import {Action} from '@ngrx/store';
import {Product} from '../../models/Product';

export enum EProductActions {
  GetAllProducts = '[Products] Get Products',
  GetAllProductsSuccess = '[Products] Get Products Success',
  GetProduct = '[Products] Get Product',
  GetProductSuccess = '[Products] Get Product Success',
  DeleteProduct = '[Product] Delete Product'
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
  constructor(public id: number) {
  }
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {
  }
}

export class DeleteProduct implements Action {
  public readonly type = EProductActions.DeleteProduct;
  constructor(public id: number) {
  }
}

export type ProductActions = GetAllProducts | GetAllProductsSuccess | GetProduct | GetProductSuccess | DeleteProduct;

