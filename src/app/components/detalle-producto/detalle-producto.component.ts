import { HttpEventType } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Producto } from 'src/app/common/producto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit{
  
  @Input()producto: Producto;
  private fotoSelect: File;
  producto2: Producto[];
  urlViste: string;

  constructor(public productService: ProductoServicioService, public activedRoute: ActivatedRoute, public router: Router){}

  ngOnInit(): void {
      this.activedRoute.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (id) {
          this.productService.getProduct(id).subscribe(producto=> {
            this.producto = producto;
            this.urlViste = producto.url;
            
          } )
        }
      })
      
      this.productService.getProductos()
      .subscribe(data => this.producto2 = data);
  }

  pdfURL(nombre: any) {

    console.log(nombre);
    
    return `http://localhost:8080/api/productos/uploads/${nombre}` 
   
  }

  seleccionarFoto(event){
    this.fotoSelect = event.target.files[0];
    console.log(this.fotoSelect);
    if (this.fotoSelect.type.indexOf('pdf') < 0) {
      Swal.fire('Error al seleccionar archivo', 'El archivo debe ser del tipo PDF', 'error');
      this.fotoSelect = null;
    }
  }

  subirFoto(){

    if (!this.fotoSelect) {
      Swal.fire('Error: al subir PDF', 'Debe seleccionar un archivo', 'error');
    }else{

    this.productService.subirFoto(this.fotoSelect, this.producto.id)
    .subscribe( event =>{
      
      
        Swal.fire('El PDF cargado', 'El PDF se ha asociado al producto correctamente', 'success'); 
        
        this.router.navigate(['/productoscrud/']);
    })
  }
}



}
