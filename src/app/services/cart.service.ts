import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);


  storage: Storage = sessionStorage;


  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;

      this.calcularTotalCarrito();

    }

   }

   persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
   }


  addToCart(theCartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {
      
      existingCartItem.quantity++;

    }
    else{
      this.cartItems.push(theCartItem);
    }

    //calcular precio total

    this.calcularTotalCarrito();

  }
  calcularTotalCarrito() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItems of this.cartItems){
      totalPriceValue += currentCartItems.quantity * currentCartItems.unitPrice;
      totalQuantityValue += currentCartItems.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItems();

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('contenidos del cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`nombre: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, precioUnidad=${tempCartItem.unitPrice}, subpreciototal=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue}`);
    console.log('............-------.......------');
  }

  decrementaCantidad(theCartItem: CartItem) {
    
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }
    else{
      this.calcularTotalCarrito()
    }
  }

  remove(theCartItem: CartItem) {
    
    const itemIndex = this.cartItems.findIndex( tempCartItem =>  tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.calcularTotalCarrito();
    }

  }

}
