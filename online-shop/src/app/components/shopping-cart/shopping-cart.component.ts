import {Component, OnInit} from '@angular/core';
import {Cart, OrderInput} from 'src/app/models/OrderInput';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {NavigationService} from '../../services/navigation.service';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {Product} from '../../models/Product';

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

  constructor(private shoppingCartService: ShoppingCartService, private navigationService: NavigationService,
              private productService: ProductService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUserInfos('doej').subscribe(data => {
      this.currentCart = data.cart;
      this.currentCart.forEach(a => {
        this.getProduct(a.productId).subscribe(resp => this.productsToDisplay.push(resp));
      });
    });
  }

  onClickCheckout() {
    this.orderInput.products = this.currentCart;
    this.orderInput.customer = 'doej';
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
        document.getElementById('decreaseQuantityButton' + Id).hidden = false;
        element.quantity++;
      }
    });
    this.updateCart(this.currentCart);
  }

  decreaseQuantity(Id) {
    this.currentCart.find(element => {
      if (element.productId === Id) {
        if (element.quantity === 2) {
          document.getElementById('decreaseQuantityButton' + Id).hidden = true;
        }
        element.quantity--;
      }
    });
    this.updateCart(this.currentCart);
  }

  deleteProductFromCart(id) {
    this.currentCart.find(element => {
      if (element.productId === id) {
        this.currentCart.splice(this.currentCart.indexOf(element), 1);
        this.productsToDisplay.find(a => {
          if (a.id === id) {
            this.productsToDisplay.splice(this.productsToDisplay.indexOf(a), 1);
          }
        });
      }
    });
    this.updateCart(this.currentCart);
  }

  updateCart(cart: Cart[]) {
    this.userService.updateUserCart('doej', cart).subscribe(() => {
    });
  }
}
