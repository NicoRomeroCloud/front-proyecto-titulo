import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/common/usuario';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  storage: Storage = sessionStorage;

  hide = true;

  titulo:string= "Inicia sesión para acceder a la compra de productos, ¿genail? ¿no?"
  usuario:Usuario;
  constructor( public authService: AuthService, public router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {

    if (this.authService.isLogged()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya ingresaste al sistema`, 'info');
      this.router.navigateByUrl('/products');
    }

  }

  login():void{

    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
     Swal.fire('Error Login', 'Username o Password vacías!', 'warning');
      return;
    }

  this.authService.login(this.usuario).subscribe(response => {
    console.log(response);

    if (this.usuario.roles.includes("ROLE_ADMIN")) {
      this.router.navigateByUrl('/clientes');
      
    }else{
      this.router.navigateByUrl('/home');

    }


   

    this.authService.guardarUsuario(response.access_token);
  
    this.authService.guardarToken(response.access_token);

    let usuario = this.authService.usuario;


    this.storage.setItem('userEmail', JSON.stringify(usuario.email));


    Swal.fire('Login', `Hola ${usuario.nombre} ${usuario.apellido}, has iniciado sesión con éxito!`, 'success');
  },err =>{
    if (err.status == 400) {
      Swal.fire('Error al ingresar', 'Usuario o clave incorrectas!', 'error');
    }
  } 
  );

}


}
