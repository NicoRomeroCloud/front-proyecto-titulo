import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Producto } from 'src/app/common/producto';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Producto;

  @Input()producto: Producto;

  urlViste: string;
  constructor(private productService: ProductoServicioService,
    private cartService: CartService,          
    private route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.productService.getProduct(id).subscribe(producto=> {
          this.producto = producto;
          this.urlViste = producto.url;
        } )
      }
    })

  }
  
  pdfURL(nombre: any) {

    console.log(nombre);
    
    return `http://localhost:8080/api/productos/uploads/${nombre}` 
   
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
