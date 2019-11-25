import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';

import {FormControl, FormGroup} from '@angular/forms';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editingProduct;
  editingProductId;
  title = 'Edit';
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      category: new FormControl(),
      image: new FormControl(),
      price: new FormControl(),
      description: new FormControl()
    });

    this.editingProductId = this.route.snapshot.params.id;
    this.productService.getProductById(this.editingProductId).subscribe(a => {
        this.editingProduct = a;
        this.formGroup.setValue({
          id: this.editingProduct.id,
          name: this.editingProduct.name,
          category: this.editingProduct.category,
          image: this.editingProduct.image,
          price: this.editingProduct.price,
          description: this.editingProduct.description
        });
      }
    );
  }

  onClickSubmit(formData) {
    this.editingProduct.id = formData.id;
    this.editingProduct.name = formData.name;
    this.editingProduct.category = formData.category;
    this.editingProduct.image = formData.image;
    this.editingProduct.price = formData.price;
    this.editingProduct.description = formData.description;
    this.productService.editProduct(this.editingProduct, this.editingProductId).subscribe(() => this.navigationService.goingToProductList());
  }
}
