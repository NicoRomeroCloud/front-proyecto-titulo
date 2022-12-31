import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Usuario } from 'src/app/common/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login2-status',
  templateUrl: './login2-status.component.html',
  styleUrls: ['./login2-status.component.css']
})
export class Login2StatusComponent implements OnInit {

  usuario: Usuario;
  usuario2:Usuario[];


  user: any;
 user2: any;

  constructor( private activatedRoute: ActivatedRoute, public authService: AuthService, private router: Router, private usuarioService: UsuarioServiceService) { }

  ngOnInit(){
    


    
  }

  logout():void{

    Swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesión de manera correcta`, 'success');
    this.authService.logout();

    this.router.navigateByUrl('/products');

  }

  cargarUser(){

    let user = sessionStorage.getItem('usuario')
    console.log("USERRRRRR"+ user.match('roles').join("ROLE_ADMIN"));
    


    if (user != null) {
      return JSON.parse(user);
    }

  }

}
