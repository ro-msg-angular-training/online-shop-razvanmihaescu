import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User.model';
import {Cart} from '../../models/OrderInput.model';
import {select, Store} from '@ngrx/store';
import {selectSelectedProduct} from '../../store/selectors/user.selector';
import {IAppState} from '../../store/states/app.state';
import {DeleteProduct, GetProduct} from '../../store/actions/product.action';
import {Product} from '../../models/Product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  detailedProduct: Product = {id: null, description: null, name: null, price: null, category: null, imageUrl: null};
  adminButtonsState: boolean;
  product$ = this.store.pipe(select(selectSelectedProduct));

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private navigationService: NavigationService,
              private userService: UserService,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    // this.productService.getProductById(this.route.snapshot.params.id).subscribe(a => this.detailedProduct = a);
    this.store.dispatch(new GetProduct(this.route.snapshot.params.id));
    this.product$.subscribe(a => this.detailedProduct = a);
    this.adminButtonsState = localStorage.getItem('roles').toString().toLowerCase().includes('admin');
  }

  onClickDelete() {
    // this.productService
    //   .deleteProduct(this.detailedProduct.id)
    //   .subscribe(() =>
    //     this.navigationService.goingToProductList());

    //ngrx
    this.store.dispatch(new DeleteProduct(this.detailedProduct.id));
    this.navigationService.goingToProductList();
  }

  onClickBuy() {
    let user: User = {fullName: '', username: '', roles: [], cart: []};
    const product: Cart = {productId: this.detailedProduct.id, quantity: 1};
    this.userService.getCurrentUserInfos(localStorage.getItem('username')).subscribe(data => {
      user = data;
      if (user.cart.length === 0) {
        user.cart.push(product);
      } else {
        let index = -1;
        for (let i = 0; i < user.cart.length; i++) {
          if (this.detailedProduct.id === user.cart[i].productId) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          user.cart.push(product);
        } else {
          user.cart[index].quantity++;
        }
      }
      this.userService.updateUserCart(localStorage.getItem('username'), user.cart).subscribe(() => {
        this.navigationService.goingToProductList();
        this.userService.updateCurrentNumberOfProducts();
      });
    });
  }
}
