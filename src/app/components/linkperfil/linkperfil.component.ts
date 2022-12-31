import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/common/usuario';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-linkperfil',
  templateUrl: './linkperfil.component.html',
  
})
export class LinkperfilComponent implements OnInit {
  usuario2: Usuario[];
  
  usuario: Usuario;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioServiceService) { }

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
