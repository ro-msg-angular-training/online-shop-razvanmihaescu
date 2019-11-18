import { Product } from './Product';

export interface OrderInput {
    customer?: string;
    orderedProducts: OrderedProducts[];
}

export interface OrderedProducts {
    productId: number;
    quantity: number;
}
