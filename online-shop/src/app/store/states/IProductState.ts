import {Product} from '../../models/Product';

export interface IProductState {
  products: Product[];
  selectedProduct: Product;
}

export const initialProductState: IProductState = {
  products: [],
  selectedProduct: null
};
