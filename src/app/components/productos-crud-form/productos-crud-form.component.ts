import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/common/producto';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import { ProductCategory } from 'src/app/common/product-category';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos-crud-form',
  templateUrl: './productos-crud-form.component.html',
  styleUrls: ['./productos-crud-form.component.css']
})
export class ProductosCrudFormComponent implements OnInit {

  producto: Producto = new Producto();
  categorias: ProductCategory[] = [];

  constructor( public productoService: ProductoServicioService, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.productoService.getCategoria()
    .subscribe(response => this.categorias = response);

    this.activatedRoute.params
    .subscribe(params => {
      let id: number = params['id'];
      if (id) {
        this.productoService.obtenerProductosId(id)
        .subscribe(response => this.producto = response);
      }
    })
  }

  crearProducto(){
    this.productoService.crearProducto(this.producto).subscribe(response => {
      Swal.fire('Éxito al guardar', 'Producto añadido a la base de datos correctamente', 'success');
      console.log("exito!!");
      this.router.navigate(['/productoscrud']);
    })
  }

  actualizarProducto(){
    this.productoService.actualizarProducto(this.producto)
    .subscribe(response => {
      Swal.fire('Éxito al editar', 'Producto actualizado correctamente', 'success');
      this.router.navigate(['/productoscrud']);
    })
  }

  compararCategoria(o1: ProductCategory, o2: ProductCategory): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }
  

}
