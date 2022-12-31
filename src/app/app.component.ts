import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from './common/usuario';
import { AuthService } from './services/auth.service';
import { UsuarioServiceService } from './services/usuario-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-ecommerce';

  usuario2:Usuario[];

  constructor( private activatedRoute: ActivatedRoute, public authService: AuthService, private usuarioService: UsuarioServiceService){

    


  }

  ngOnInit(){

    this.usuarioService.getUsuarios().subscribe(
      usuario => this.usuario2 = usuario
  );

    


  }

}
