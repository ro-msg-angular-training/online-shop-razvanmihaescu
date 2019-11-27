import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {Cart} from '../../models/OrderInput';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input()
  detailedProduct: Product;
  adminButtonState: boolean;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService, private navigationService: NavigationService, private userService: UserService) {
  }

  ngOnInit() {
    this.productService.getProductById(this.route.snapshot.params.id).subscribe(a => this.detailedProduct = a);

    if (localStorage.getItem('roles').toString().includes('admin')) {
      this.adminButtonState = true;
    } else {
      this.adminButtonState = false;
    }
  }

  onClickDelete() {
    this.productService
      .deleteProduct(this.detailedProduct.id)
      .subscribe(() =>
        this.navigationService.goingToProductList());
  }

  onClickBuy() {
    let user: User = {fullName: '', username: '', roles: [], cart: []};
    let product: Cart = {productId: this.detailedProduct.id, quantity: 1};
    this.userService.getCurrentUserInfos('doej').subscribe(data => {
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
      this.userService.updateUserCart('doej', user.cart).subscribe(() => {
        this.navigationService.goingToProductList();
        this.userService.updateCurrentNumberOfProducts();
      });
    });
  }
}
