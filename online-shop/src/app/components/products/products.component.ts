import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  addButtonState: boolean;

  constructor(private productService: ProductService) {
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
    localStorage.getItem('roles');
    console.log(localStorage.getItem('roles'));

    if (localStorage.getItem('roles').toString().includes('admin')) {
      this.addButtonState = true;
    } else {
      this.addButtonState = false;
    }
  }
}
