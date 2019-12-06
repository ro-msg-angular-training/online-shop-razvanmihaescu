import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
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

  products$ = this.store.pipe(select(selectProductList));

  constructor(private productService: ProductService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.currentUsername = localStorage.getItem('username');
    // this.productService.getProducts().subscribe(data => {
    //   this.products = data;
    //   this.filteredProducts = data;
    //   let allCategories: string[] = [];
    //   data.forEach(a => allCategories.push(a.category));
    //   this.uniqueCategories = Array.from(new Set(allCategories));
    //   this.uniqueCategories.unshift('All');
    // });
    // adding NGRX
    this.store.dispatch(new GetAllProducts());
    console.log(this.products);
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
