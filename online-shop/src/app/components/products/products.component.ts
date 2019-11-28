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
  addButtonState: boolean;
  currentUsername;
  filteredProducts: Product[];
  uniqueCategories: string[] = [];
  currentSelectedCategory = 'All';

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.currentUsername = localStorage.getItem('username');
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      let allCategories: string[] = [];
      data.forEach(a => allCategories.push(a.category));
      this.uniqueCategories = Array.from(new Set(allCategories));
      this.uniqueCategories.unshift('All');
    });
    this.addButtonState = localStorage.getItem('roles').toString().includes('admin');
  }

  filterProductsByCategory(category: string) {
    this.currentSelectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(a => a.category === category);
    }
  }
}
