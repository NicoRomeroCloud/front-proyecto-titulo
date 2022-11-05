import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/common/producto';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productosgrid.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  products: Producto[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductoServicioService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }
  listProducts(){
    //verificar si el "id" es un parámetro válido
    const categoriaID: boolean = this.route.snapshot.paramMap.has('id');
   
    if (categoriaID) {
      //con el id como parametro string, se convierte a numbero usando el simbolo "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // categoria no validam se tira default
      this.currentCategoryId = 1;
    }
   
    //senecesita obtener los productos

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }


}
