import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Purchase } from '../common/purchase';
import { Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpCliente: HttpClient, private router: Router, private authService: AuthService) { }

  private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(["/login"]);
      return true;
    }
    return false;
  }

  placeOrder(purchase: Purchase): Observable<any>{

    let httpHeaders = new HttpHeaders();
        let token = this.authService.token;
        if (token != null) {
           httpHeaders = httpHeaders.append('Authorization', 'Bearer '+ token);
        }

    return this.httpCliente.post<Purchase>(this.purchaseUrl, purchase, {
      headers: httpHeaders
    }).pipe(
      catchError(e=>{
          this.isNoAutorizado(e);
          return throwError(e);
      })
  );
  }
}
