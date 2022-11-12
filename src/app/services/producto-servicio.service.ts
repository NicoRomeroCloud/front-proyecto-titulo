import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Producto } from "../common/producto";
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {
 
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
 

  constructor(private httpClient: HttpClient) {
   }
   
    getProduct(theProductId: number): Observable<Producto> {
    
      //construir url basada en el id del producto
      const producturl= `${this.baseUrl}/${theProductId}`;

      return this.httpClient.get<Producto>(producturl);
  }

   getProductList(theCategoryId: number): Observable<Producto[]>{
   
    //POR HACER SI ES QUE LO LEES GIO: se necesita construir una url basada en el id de categoria 
    
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
    
  }

  searchProductos(theKeyword: string): Observable<Producto[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Producto[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
   
    return this.httpClient.get< GetResponseProductCategory >(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
     );
  }

}

interface GetResponseProducts{
  _embedded: {
    products: Producto[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}