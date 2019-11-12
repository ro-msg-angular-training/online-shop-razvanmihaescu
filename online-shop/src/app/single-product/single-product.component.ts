import { Component, OnInit, Input } from '@angular/core';
import { Product } from "../product";
import { PRODUCTS } from "../mock-products";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  products=PRODUCTS;
  detailedProduct:Product;
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.products.forEach((p: Product) => {
      if (p.id == this.route.snapshot.params.id) {
        this.detailedProduct = p;
      }
  });

};
}
