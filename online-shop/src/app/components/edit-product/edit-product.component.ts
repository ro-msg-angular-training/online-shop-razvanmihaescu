import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
   editingProduct;
   editingProductId;
   
   constructor(private route: ActivatedRoute, private productService:ProductService) { }
  
  ngOnInit() {
    this.editingProductId=this.route.snapshot.params.id;
    this.editingProduct=this.productService.getProductById(this.editingProductId).subscribe(a=>this.editingProduct=a);
};
 
  onClick()
  {
    this.productService.editProduct(this.editingProduct,this.editingProductId).subscribe(()=>this.productService.goingHome());
  }
}
