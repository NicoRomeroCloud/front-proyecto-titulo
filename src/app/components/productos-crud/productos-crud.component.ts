import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { Producto } from 'src/app/common/producto';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-productos-crud',
  templateUrl: './productos-crud.component.html',
  styleUrls: ['./productos-crud.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProductosCrudComponent implements OnInit {

  

  displayedColumns: string[] = ['id', 'Sku', 'Nombre', 'Categoria','description', 'unitPrice', 'imageUrl', 'active', 'unitsInStock', 'dateCreated', 'lastUpdated'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Producto | null;

  producto: Producto[];

  categoria: ProductCategory;

  

  constructor(private productoService: ProductoServicioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productoService.getProductos()
    .subscribe(data => this.producto = data);
    
  
  }

  eliminarProducto(producto: Producto){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que deseas eliminar el producto ${producto.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {
          this.productoService.eliminarProductos(producto.id).subscribe(
              reponse => {
                  this.producto = this.producto.filter(cli => cli !== producto)
                  swalWithBootstrapButtons.fire(
                      'Eliminado!',
                      `El producto ${producto.name} ha sido eliminado con éxito de la base de datos.`,
                      'success'
                    )

              }
          )
        
      }
    });

  }
  



}
