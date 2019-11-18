import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editingProduct;
  editingProductId;
  title: string = "Edit";
  formdata: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      image: new FormControl,
      price: new FormControl(),
      description: new FormControl()
    });

    this.editingProductId = this.route.snapshot.params.id;
    this.editingProduct = this.productService.getProductById(this.editingProductId).subscribe(a => {
      this.editingProduct = a

      this.formdata.setValue({
        name: this.editingProduct.name,
        category: this.editingProduct.category,
        image: this.editingProduct.image,
        price: this.editingProduct.price,
        description: this.editingProduct.description
      });
    }
    );
  };

  onClickSubmit(data) {
    this.editingProduct.name = data.name;
    this.editingProduct.category = data.category;
    this.editingProduct.image = data.image;
    this.editingProduct.price = data.price;
    this.editingProduct.description = data.description;
    this.productService.editProduct(this.editingProduct, this.editingProductId).subscribe(() => this.productService.goingHome());
  }
}
