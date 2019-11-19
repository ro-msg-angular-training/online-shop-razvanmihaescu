export interface OrderInput {
  customer?: string;
  orderedProducts: OrderedProducts[];
}

export interface OrderedProducts {
  productId: number;
  quantity: number;
}
