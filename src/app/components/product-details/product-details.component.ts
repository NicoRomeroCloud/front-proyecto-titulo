import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Producto } from 'src/app/common/producto';
import { CartService } from 'src/app/services/cart.service';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Producto;

  constructor(private productService: ProductoServicioService,
    private cartService: CartService,          
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  
  handleProductDetails() {
    //obtener la cadena de parámetros de ID y convertirlo en número 

    const theProductId: number = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart(){

    console.log(`añadiendo al carrito: ${this.product.name}, ${this.product.unitPrice}`)

    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);

  }
}
