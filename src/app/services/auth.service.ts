import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Usuario } from '../common/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout(): void {
    this._token  = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');

  }

  private _usuario: Usuario;

  private _token: string;

  constructor(private httpCliente: HttpClient) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario == null && sessionStorage.getItem("usuario") != null){
      this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }

    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    } else if(this._token == null && sessionStorage.getItem("token") != null){
      this._token = sessionStorage.getItem("token");
      return this._token;
    }

    return null;
  }



  login(usuario: Usuario): Observable<any>{

    const urlEndopoint = 'https://back-proyecto.onrender.com/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    console.log(params.toString());

    return this.httpCliente.post<any>(urlEndopoint, params.toString(), {headers: httpHeaders});

  }

  guardarUsuario(access_token: string):void{
    
    let payload = this.datosToke(access_token);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.id = payload.id;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem("usuario", JSON.stringify(this._usuario))

  }

  guardarToken(access_token: string):void{
    
    this._token = access_token;

    sessionStorage.setItem("token", access_token);

  }

  datosToke(access_token: string):any{
    if (access_token != null) {
    return JSON.parse(atob(access_token.split(".")[1]));
    }
    return null;
  }

  isLogged(): boolean{
    let payload = this.datosToke(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;

  }

  hasRole(role:string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

}
