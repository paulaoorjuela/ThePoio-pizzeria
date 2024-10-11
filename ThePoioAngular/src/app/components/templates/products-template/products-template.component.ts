import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IShoppingCart } from '../../../models/shoppingCartModel';

@Component({
  selector: 'app-products-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-template.component.html',
  styleUrl: './products-template.component.css',
})
export class ProductsTemplateComponent {
  @Input() product!: any;
  @Input({ required: true }) product_src_img!: string;
  @Input() product_name!: string;
  @Input() product_ingredients!: string;
  @Input() product_price!: string;
  @Input() product_type!: string;
  @Input() product_quantity!: number;

  @Output() productData = new EventEmitter();
  @Output() addToCartClicked = new EventEmitter();

  ProductControl() {
    let ProductData = {
      product_src_img: this.product_src_img,
      product_name: this.product_name,
      product_ingredients: this.product_ingredients,
      product_price: this.product_price,
      product_type: this.product_type,
    };
    this.productData.emit(ProductData);
  }

  addToCart() {
    const priceAsNumber: number = parseFloat(this.product_price);
    const productData = {
      product_src_img: this.product_src_img,
      product_name: this.product_name,
      product_ingredients: this.product_ingredients,
      product_price: this.product_price,
      product_type: this.product_type,
      product_quantity: this.product_quantity,
    };

    let cartItem: IShoppingCart = {
      product_name: productData.product_name,
      product_price: priceAsNumber,
      product_src_img: productData.product_src_img,
      product_quantity: 1,
    };
    if (localStorage.getItem('shoppingCart') == null) {
      let shoppingCart: IShoppingCart[] = [];
      shoppingCart.push(cartItem);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    } else {
      let shoppingCartStorage = localStorage.getItem('shoppingCart') as string;
      let shoppingCart = JSON.parse(shoppingCartStorage);
      let index = -1
      for (let i = 0; i < shoppingCart.length; i++) {
        let itemOfCart = shoppingCart[i];
        if (cartItem.product_name === itemOfCart.product_name) {
          index = i;
          break;
        }
      }
      if(index == -1){
      shoppingCart.push(cartItem);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      }else{
        let cartItem = shoppingCart[index]
        cartItem.product_quantity ++
        shoppingCart[index] = cartItem
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      }
    }

    console.log(productData);
    this.addToCartClicked.emit(productData);
  }

}
