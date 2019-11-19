import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/models/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: '../edit-product/edit-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  title = 'Add';
  formGroup: FormGroup;
  newProduct: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(),
      price: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
      description: new FormControl()
    });

    this.newProduct = {
      id: null,
      name: '',
      category: '',
      price: null,
      image: '',
      description: ''
    };
  }

  onClickSubmit(data) {
    this.newProduct.id = data.id;
    this.newProduct.name = data.name;
    this.newProduct.category = data.category;
    this.newProduct.image = data.image;
    this.newProduct.price = data.price;
    this.newProduct.description = data.description;
    this.productService.addProduct(this.newProduct).subscribe(() => this.productService.goingToProductList());
  }

}
