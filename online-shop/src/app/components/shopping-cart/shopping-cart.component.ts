import {Component, OnInit} from '@angular/core';
import {OrderedProducts, OrderInput} from 'src/app/models/OrderInput';
import {Product} from 'src/app/models/Product';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {NavigationService} from '../../services/navigation.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  convertedOrderedProducts: OrderedProducts[] = []; // this is contained in OrderInput(must convert orderedProductList to this type)
  orderInput: OrderInput = {
    customer: 'doej',
    products: this.convertedOrderedProducts
  };
  orderedProductList: Product[]; // pun aici toate produsele comandate si apoi le display=ui in html

  constructor(private shoppingCartService: ShoppingCartService, private navigationService: NavigationService, private productService: ProductService) {
  }

  ngOnInit() {
    this.orderedProductList = this.shoppingCartService.getSelectedProducts();
    this.convertedOrderedProducts.push({productId: this.orderedProductList[0].id, quantity: 1});
    for (let x of this.orderedProductList) {
      this.convertedOrderedProducts.find(element => {
        if (element.productId === x.id) {
          element.quantity++;
        } else {
          this.convertedOrderedProducts.push({productId: x.id, quantity: 1});
        }
      });
      this.orderInput.products = this.convertedOrderedProducts;
    }
  }


  onClick() {
    this.shoppingCartService.addOrder(this.orderInput).subscribe(() => this.navigationService.goingHome);
    this.resetShoppingCart();
  }

  resetShoppingCart() {
    this.convertedOrderedProducts = []; // this is contained in OrderInput(must convert orderedProductList to this type)
    this.orderInput = {
      customer: 'doej',
      products: this.convertedOrderedProducts
    };
    this.orderedProductList = [];
  }

  getProductName(Id): string {
    let result = '';
    this.orderedProductList.find(element => {
      if (element.id === Id) {
        result = element.name;
      }
    });
    return result;
  }

  getProductImage(Id): string {
    let result = '';
    this.orderedProductList.find(element => {
      if (element.id === Id) {
        result = element.image;
      }
    });
    return result;
  }

  getProductCategory(Id): string {
    let result = '';
    this.orderedProductList.find(element => {
      if (element.id === Id) {
        result = element.category;
      }
    });
    return result;
  }

  getProductPrice(Id): number {
    let result = null;
    this.orderedProductList.find(element => {
      if (element.id === Id) {
        result = element.price;
      }
    });
    return result;
  }

  increaseQuantity(Id) {
    this.orderInput.products.find(element => {
      if (element.productId === Id) {
        document.getElementById('increaseQuantityButton' + Id).hidden = false;
        element.quantity++;
      }
    });
  }

  decreaseQuantity(Id) {
    this.orderInput.products.find(element => {
      if (element.productId === Id) {
        if (element.quantity === 1) {
          document.getElementById('decreaseQuantityButton' + Id).hidden = true;
        } else {
          element.quantity--;
        }
      }
    });
  }
}
