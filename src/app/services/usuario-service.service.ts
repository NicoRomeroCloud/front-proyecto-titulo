import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../common/role';
import { Usuario } from '../common/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url:string='http://localhost:8080/api/user';

  private urlRol:string='http://localhost:8080/api/role';

  constructor(private http: HttpClient, private router: Router) { }

  crearUser(user: Usuario):Observable<Usuario>{

   

    return this.http.post<Usuario>(this.url+'/register', user);
  }

  crearRol(rol: Role):Observable<Role>{

    return this.http.post<Role>(this.urlRol+'/rol', rol);

  }


}
