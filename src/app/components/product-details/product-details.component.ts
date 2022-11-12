import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/common/producto';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Producto;

  constructor(private productService: ProductoServicioService,
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

}
