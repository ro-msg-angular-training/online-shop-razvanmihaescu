import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from '../../models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  currentShoppingCart:Product[];

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }

  onClick()
  {
    this.productService.addOrder("doej",this.currentShoppingCart).subscribe(()=>this.productService.goingHome);
  }
}
