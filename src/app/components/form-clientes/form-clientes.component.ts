import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html'
})
export class FormClientesComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo:string = "Crear Cliente";
  public errores: string[];


  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

   create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
      },
      err=> {
        this.errores = err.error.errors as string[];

      }
    );
  }


  update():void{
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualziado', `Cliente ${json.cliente.nombre} editado correctamente`, 'success');

      },
      err=> {
        this.errores = err.error.errors as string[];
        
      }
    )
  }


}
