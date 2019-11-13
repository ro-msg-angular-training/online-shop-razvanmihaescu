import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from "../../services/product.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[];
  selectedProduct: Product;
  
  constructor(private productService:ProductService) { }

  onSelect(product: Product): void {
    this.selectedProduct=product;
  }

  ngOnInit() {      
    this.productService.getProducts().subscribe(data=>this.products=data);
};
}
