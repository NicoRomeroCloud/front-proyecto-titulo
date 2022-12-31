import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/common/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioServiceService, private activatedRoute: ActivatedRoute, public authService: AuthService) { }


  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params =>{

      let id:number = +params.get('id');

      if(id){
        this.usuarioService.getUser(id).subscribe(usuario =>
          this.usuario = usuario
        )
      }

    }

    )


  }

  

}
