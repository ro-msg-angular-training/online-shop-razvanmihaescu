import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {OrderedProducts, OrderInput} from 'src/app/models/OrderInput';
import {Product} from 'src/app/models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  selectedProducts: OrderedProducts[] = [];
  orderInput: OrderInput = {orderedProducts: this.selectedProducts};
  orderedProductList: Product[]; // pun aici toate produsele comandate si apoi le display=ui in html

  mockProducts: OrderedProducts = {
    productId: 2,
    quantity: 5
  };

  constructor(private productService: ProductService) {
  }

  ngOnInit() {

  }

  onClick() {
    this.productService.addOrder(this.orderInput).subscribe(() => this.productService.goingHome);
  }
}
