import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../common/producto';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {
   }
   
   getProductList(theCategoryId: number): Observable<Producto[]>{
   
    //POR HACER SI ES QUE LO LEES GIO: se necesita construir una url basada en el id de categoria 
    
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
    map(response => response._embedded.products)
   );
  }
}

interface GetResponse{
  _embedded: {
    products: Producto[];
  }
}
