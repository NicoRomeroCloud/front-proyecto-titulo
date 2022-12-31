import { Injectable } from "@angular/core";
import {  } from "module";
import { Observable, throwError } from "rxjs";
import { of } from "rxjs";
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Cliente } from "./cliente";
import { map, catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
@Injectable(
    {providedIn: 'root'}
)
export class ClienteService {

    private url:string='http://localhost:8080/api/cliente/clientes';

    private httHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
    
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

      private agregarAuthoHeader(){
        let token = this.authService.token;

        if (token != null) {
            return this.httHeaders.append('Authorization', 'Bearer ' + token);
        }
        return this.httHeaders;
      }

    getClientes(): Observable<Cliente[]>{

            return this.http.get(this.url).pipe(
                map( (response) => response as Cliente[] )
            );

    }

    create(cliente: Cliente): Observable<Cliente>{
        return this.http.post(this.url, cliente, {headers: this.agregarAuthoHeader()}).pipe(
            map((response: any) => response.cliente as Cliente),
            catchError(e => {

                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }

                if (e.status==400) {
                    return throwError(e);
                }

                this.router.navigate(['/clientes']);
                Swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.url}/${id}`, {headers: this.agregarAuthoHeader()}).pipe(
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

    update(cliente: Cliente): Observable<any>{
        return this.http.put<any>(`${this.url}/${cliente.id}`, cliente, {headers: this.agregarAuthoHeader()}).pipe(
            catchError(e => {
                
                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }


                if (e.status==400) {
                    return throwError(e);
                }

                this.router.navigate(['/clientes']);
                Swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    delete(id: number): Observable<Cliente>{
        return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.agregarAuthoHeader()}).pipe(
            catchError(e => {

                if (this.isNoAutorizado(e)) {
                    return throwError(e);
                }

                this.router.navigate(['/clientes']);
                Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
        let formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("id", id);

        let httpHeaders = new HttpHeaders();
        let token = this.authService.token;
        if (token != null) {
           httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
        }

        const req = new HttpRequest('POST',`${this.url}/upload`, formData,{
            reportProgress: true,
            headers: httpHeaders
        });

        return this.http.request(req);
    }

}
// .pipe(
//     map((response: any) => response.cliente as Cliente),
//     catchError(e => {
//         this.router.navigate(['/clientes']);
//         Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
//         return throwError(e);
//     })
// )