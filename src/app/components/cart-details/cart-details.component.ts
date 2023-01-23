import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Cliente } from '../clientes/cliente';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(public cartService: CartService, public router: Router, public authService: AuthService) { }

  private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(["/login"]);
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.calcularTotalCarrito();
  }

  incrementCantidad(theCartItem: CartItem){

    this.cartService.addToCart(theCartItem);

  }
  decrementaCantidad(theCartItem: CartItem){
    this.cartService.decrementaCantidad(theCartItem);
  }
  quitar(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }

  onSubmit(){
    this.router.navigate(["/products"])
  }
}
