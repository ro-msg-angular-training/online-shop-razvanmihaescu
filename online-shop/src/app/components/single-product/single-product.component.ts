import { Component, OnInit, Input } from '@angular/core';
import { Product } from "../../models/Product";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  detailedProduct:Product;
  constructor(private route: ActivatedRoute, private productService:ProductService) { }
  
  ngOnInit() {
   this.productService.getProductById(this.route.snapshot.params.id).subscribe(a=>this.detailedProduct=a);
};

onClick()
{
  this.productService
  .deleteProduct(this.detailedProduct.id)
  .subscribe(()=>
    this.productService.goingHome());
}

}
