import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  authService2: AuthService
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );


    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }



}
