import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { ModalService } from "src/app/services/modal.service";



@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  @Input()cliente: Cliente;

  public fotoSelect: File;

  progreso:number = 0;



  constructor( public clienteService: ClienteService, 
    public activatedRoute: ActivatedRoute, 
    public modalService: ModalService) { }

  ngOnInit(): void {


  }

  seleccionarFoto(event){
    this.fotoSelect = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSelect);
    if (this.fotoSelect.type.indexOf('image') < 0) {
      Swal.fire('Error al seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSelect = null;
    }
  }

  subirFoto(){

    if (!this.fotoSelect) {
      Swal.fire('Error: al subir imagen', 'Debe seleccionar una foto', 'error');
    }else{

    this.clienteService.subirFoto(this.fotoSelect, this.cliente.id)
    .subscribe( event =>{
      if (event.type === HttpEventType.UploadProgress) {
        this.progreso = Math.round((event.loaded/event.total)*100)
      }else if(event.type === HttpEventType.Response){
        let response: any = event.body;
        this.cliente = response.cliente as Cliente;
        
        this.modalService.notificarUpload.emit(this.cliente);
        Swal.fire('Lafoto se ha subido correctamente!', response.mensaje, 'success'); 

      }
    })
  }
}

cerrarModal(){
  this.modalService.cerrarModal();
  this.fotoSelect = null;
  this.progreso = 0;
}

}
