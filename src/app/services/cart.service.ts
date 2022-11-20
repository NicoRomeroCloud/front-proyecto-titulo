import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();



  

  constructor() { }

  addToCart(theCartItem: CartItem){

    let siExisteEnElCarro: boolean = false;
    let existeItemCarro: CartItem = undefined;

    if(this.cartItems.length > 0){

      existeItemCarro = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      siExisteEnElCarro = (existeItemCarro != undefined);

    }

    if (siExisteEnElCarro) {
      
      existeItemCarro.quantity++;

    }
    else{
      this.cartItems.push(theCartItem);
    }

    //calcular precio total

    this.calcularTotalCarrito();

  }
  calcularTotalCarrito() {

    let precioValorTotal: number = 0;
    let cantidadValorTotal: number = 0;

    for(let currentCartItems of this.cartItems){
      precioValorTotal += currentCartItems.quantity * currentCartItems.unitPrice;
      cantidadValorTotal += currentCartItems.unitPrice;
    }

    this.totalPrice.next(precioValorTotal);
    this.totalQuantity.next(cantidadValorTotal);

    this.logCartData(precioValorTotal, cantidadValorTotal);

  }
  logCartData(precioValorTotal: number, cantidadValorTotal: number) {
    
    console.log('contenidos del cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`nombre: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, precioUnidad=${tempCartItem.unitPrice}, subpreciototal=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${precioValorTotal}`);
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
