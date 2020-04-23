import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/models/Product.model';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-add-product',
  templateUrl: '../edit-product/edit-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  title = 'Add';
  formGroup: FormGroup;
  newProduct: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private navigationService: NavigationService) {
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
      category: {
        name: '',
        description: ''
      },
      price: null,
      imageUrl: '',
      description: ''
    };
  }

  onClickSubmit(data) {
    this.newProduct.id = data.id;
    this.newProduct.name = data.name;
    this.newProduct.category = data.category;
    this.newProduct.imageUrl = data.image;
    this.newProduct.price = data.price;
    this.newProduct.description = data.description;
    this.productService.addProduct(this.newProduct).subscribe(() => this.navigationService.goingToProductList());
  }

}
