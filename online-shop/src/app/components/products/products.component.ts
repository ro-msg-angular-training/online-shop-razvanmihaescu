import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product.model';
import {ProductService} from '../../services/product.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/states/app.state';
import {GetAllProducts} from '../../store/actions/product.action';
import {selectProductList} from '../../store/selectors/user.selector';

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
  searchFieldValue: string;

  products$ = this.store.pipe(select(selectProductList));

  constructor(private productService: ProductService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.currentUsername = localStorage.getItem('username');

    // adding NGRX
    this.store.dispatch(new GetAllProducts());
    this.products$.subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      const allCategories: string[] = [];
      data.forEach(a => allCategories.push(a.category.name));
      this.uniqueCategories = Array.from(new Set(allCategories));
      this.uniqueCategories.unshift('All');
    });
    this.addButtonState = localStorage.getItem('roles').toString().toLowerCase().includes('admin');
  }

  filterProductsByCategory(category: string) {
    this.currentSelectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(a => a.category.name === category);
    }
  }

  searchByName() {
    this.filterProductsByCategory(this.currentSelectedCategory);
    if (this.searchFieldValue !== '') {
      this.filteredProducts = this.filteredProducts.filter(a => a.name.toLowerCase().includes(this.searchFieldValue.toLowerCase())
      );
    } else {
      this.filterProductsByCategory(this.currentSelectedCategory);
    }
  }
}
