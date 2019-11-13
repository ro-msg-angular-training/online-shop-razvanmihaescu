import { Product } from './Product';

export interface OrderInput{
    customer:string;
    products:Product[];
}