import {Product} from '../../models/Product.model';

export interface IProductState {
  products: Product[];
  selectedProduct: Product;
}

export const initialProductState: IProductState = {
  products: [],
  selectedProduct: null
};
