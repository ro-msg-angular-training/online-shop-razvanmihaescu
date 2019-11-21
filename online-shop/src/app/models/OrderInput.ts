export interface OrderInput {
  customer: string;
  products: OrderedProducts[];
}

export class OrderedProducts {
  productId: number;
  quantity: number;
}
