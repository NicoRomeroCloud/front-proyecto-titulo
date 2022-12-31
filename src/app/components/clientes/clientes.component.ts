import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { ModalService } from "src/app/services/modal.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit{

    clientes: Cliente[];

    clienteSeleccionado:Cliente;

    constructor(private clienteService: ClienteService, private modalService: ModalService, public authService: AuthService) {
        
    }

    

    ngOnInit() {
        this.clienteService.getClientes().subscribe(
            clientes => this.clientes = clientes
        );

        

        this.modalService.notificarUpload.subscribe(cliente => {
          this.clientes = this.clientes.map(clienteOriginal => {
            if (cliente.id == clienteOriginal.id) {
              clienteOriginal.foto = cliente.foto;
            }
            return clienteOriginal;
          })
        } )
    }

    delete(cliente: Cliente): void{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Estás seguro?',
            text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {

            if (result.isConfirmed) {

                this.clienteService.delete(cliente.id).subscribe(
                    reponse => {
                        this.clientes = this.clientes.filter(cli => cli !== cliente)
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            `El cliente ${cliente.nombre} ha sido eliminado con éxito.`,
                            'success'
                          )

                    }
                )
              
            }
          });
    }

    abrirModal(cliente: Cliente){
      this.clienteSeleccionado = cliente;
      this.modalService.abriModal();
    }

}