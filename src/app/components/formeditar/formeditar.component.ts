import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/common/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-formeditar',
  templateUrl: './formeditar.component.html',
  styleUrls: ['./formeditar.component.css']
})
export class FormeditarComponent implements OnInit {

  public usuario: Usuario = new Usuario();


  constructor( private router: Router,private activatedRoute: ActivatedRoute, private usuarioService: UsuarioServiceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUser(id).subscribe(
          (usuario) => this.usuario = usuario
        )
      }
    })
  }

  updateUser(){
    this.usuarioService.update(this.usuario).subscribe(
      json => {
      this.router.navigate(['/perfilusuario/'+this.authService.usuario.id])

      }
    )
  }

}
