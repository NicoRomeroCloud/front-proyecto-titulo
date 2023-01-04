import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Role } from '../common/role';
import { Usuario } from '../common/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url:string='http://localhost:8080/api/user';

  private urlRol:string='http://localhost:8080/api/role';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private isNoAutorizado(e):boolean{
    if(e.status==401){

        if (this.authService.isLogged()) {
            this.authService.logout();
        }

      this.router.navigate(["/login"]);
      return true;
    }
    if(e.status==403){

        Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username}, no tienes acceso a este recurso!`, 'warning')

        if (this.authService.isLogged()) {
            this.authService.logout();
        }

      this.router.navigate(["/login"]);
      return true;
    }
    return false;
  }

  crearUser(user: any):Observable<Usuario>{
    console.log(user);
    
    const obj = {
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      password: user.password,
      roles: [
        {
          id: 1
          
        }
      ],
      enabled: 1,
      email: user.email
    }

    console.log(obj);
    return this.http.post<Usuario>(this.url+'/register', obj);
    
    
  }

  public getCurrentUser(): Observable<any>{

    return this.http.get<any>(`${this.url}/usuarios/current-user`)
    .pipe(
      map((response) => response)
    )

  }
  
  getUsuarios(): Observable<Usuario[]>{
    
    return this.http.get(this.url+'/usuarios')
    .pipe(
      map((response) => response as Usuario[])
    );
  }

  public getUsuario(){
    let userStr = sessionStorage.getItem('usuario');
    return userStr;
  }

  getUser(id): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuarios/${id}`)
    .pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
            return throwError(e);
        }
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
    })
    );
  }

  update(usuario: Usuario): Observable<Usuario>{

    return this.http.put<Usuario>(`${this.url}/usuarios/editar/${usuario.id}`, usuario)
    .pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status==400) {
          return throwError(e);
        }

        this.router.navigate(['perfilusuario']);
        Swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(e);

      })
    )

  }

  delete(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}/usuario/delete/${id}`)
    .pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
      }
      this.router.navigate(['/listausuarios']);
                Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
                return throwError(e);
      })
    )
  }

  // crearRol(rol: Role):Observable<Role>{

  //   return this.http.post<Role>(this.urlRol+'/rol', rol);

  // }


}
