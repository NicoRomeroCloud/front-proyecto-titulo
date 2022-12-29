import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/common/usuario';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor( private userService: UsuarioServiceService, private router: Router ) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.userService.crearUser(this.usuario).subscribe(response =>{
      Swal.fire('Genial', 'Te has registrado correctamente', 'success');
      this.router.navigate(['/login'])
    })

    

  }

}
