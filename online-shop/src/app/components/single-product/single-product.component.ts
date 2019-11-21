import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input()
  detailedProduct: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.productService.getProductById(this.route.snapshot.params.id).subscribe(a => this.detailedProduct = a);
  }

  onClickDelete() {
    this.productService
      .deleteProduct(this.detailedProduct.id)
      .subscribe(() =>
        this.navigationService.goingToProductList());
  }

  onClickBuy() {
    this.shoppingCartService.selectedProducts.push(this.detailedProduct);
    this.navigationService.goingToProductList();
  }
}
