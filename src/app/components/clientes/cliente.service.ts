import { Injectable } from "@angular/core";
import {  } from "module";
import { Observable, throwError } from "rxjs";
import { of } from "rxjs";
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Cliente } from "./cliente";
import { map, catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable(
    {providedIn: 'root'}
)
export class ClienteService {

    private url:string='http://localhost:8080/api/cliente/clientes';

    private httHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http: HttpClient, private router: Router) {}
        

        getClientes(): Observable<Cliente[]>{

            return this.http.get(this.url).pipe(
                map( (response) => response as Cliente[] )
            );

    }

    create(cliente: Cliente): Observable<Cliente>{
        return this.http.post(this.url, cliente, {headers: this.httHeaders}).pipe(
            map((response: any) => response.cliente as Cliente),
            catchError(e => {

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
        return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
            catchError(e => {
                this.router.navigate(['/clientes']);
                Swal.fire('Error al editar', e.error.mensaje, 'error');
                return throwError(e);
            })
        );
    }

    update(cliente: Cliente): Observable<any>{
        return this.http.put<any>(`${this.url}/${cliente.id}`, cliente, {headers: this.httHeaders}).pipe(
            catchError(e => {
                
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
        return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httHeaders}).pipe(
            catchError(e => {
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

        const req = new HttpRequest('POST',`${this.url}/upload/`, formData,{
            reportProgress: true
        })

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