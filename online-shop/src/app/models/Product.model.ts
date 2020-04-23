import {ProductCategory} from './ProductCategory.model';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  imageUrl: string;
  price: number;
  description: string;
}
