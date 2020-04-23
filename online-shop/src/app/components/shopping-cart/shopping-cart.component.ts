import {Component, OnInit} from '@angular/core';
import {Cart, OrderInput} from 'src/app/models/OrderInput.model';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {NavigationService} from '../../services/navigation.service';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {Product} from '../../models/Product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  orderInput: OrderInput = {
    customer: '',
    products: [] = []
  };
  currentCart: Cart[] = [];
  productsToDisplay: Product[] = [];
  currentUser: string;


  constructor(private shoppingCartService: ShoppingCartService, private navigationService: NavigationService,
              private productService: ProductService, private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    this.userService.getCurrentUserInfos(this.currentUser).subscribe(data => {
      this.currentCart = data.cart;
      this.currentCart.forEach(a => {
        this.getProduct(a.productId).subscribe(resp => {
          this.productsToDisplay.push(resp);
        });
      });
    });
  }

  onClickCheckout() {
    this.orderInput.products = this.currentCart;
    this.orderInput.customer = this.currentUser;
    this.shoppingCartService.addOrder(this.orderInput).subscribe(() => {
    });
    this.navigationService.goingToProductList();
    this.resetShoppingCart();
  }

  getProduct(Id) {
    return this.productService.getProductById(Id);
  }

  resetShoppingCart() {
    this.orderInput = {
      customer: '',
      products: [] = []
    };
    this.currentCart = [];
    this.productsToDisplay = [];
    this.updateCart([]);
  }

  getProductQuantity(Id): number {
    let quantity = null;
    this.currentCart.find(element => {
      if (element.productId === Id) {
        quantity = element.quantity;
      }
    });
    return quantity;
  }

  increaseQuantity(Id) {
    this.currentCart.find(element => {
      if (element.productId === Id) {
        element.quantity++;
      }
    });
    this.updateCart(this.currentCart);
  }

  decreaseQuantity(Id) {
    this.currentCart.find(element => {
      if (element.productId === Id) {
        element.quantity--;
      }
    });
    this.updateCart(this.currentCart);
  }

  deleteProductFromCart(id) {
    this.productsToDisplay.find(a => {
      if (a !== undefined && a.id === id) {
        this.productsToDisplay.splice(this.productsToDisplay.indexOf(a), 1);
      }
    });
    this.currentCart.find(element => {
      if (element !== undefined && element.productId === id) {
        this.currentCart.splice(this.currentCart.indexOf(element), 1);
      }
    });
    this.updateCart(this.currentCart);
  }

  updateCart(cart: Cart[]) {
    this.userService.updateUserCart(this.currentUser, cart).subscribe(() => {
      this.userService.updateCurrentNumberOfProducts();
    });
  }

  decreaseButtonState(id: number) {
    return this.getProductQuantity(id) !== 1;
  }
}
