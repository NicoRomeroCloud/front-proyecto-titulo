import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Producto } from "../common/producto";
import { ProductCategory } from '../common/product-category';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  private productoUrl = 'http://localhost:8080/api/productos'

  private caegoriaoUrl = 'http://localhost:8080/api/productos/categorias'


  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
  }

  private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){

        if (this.authService.isLogged()) {
            this.authService.logout();
        }

      this.router.navigate(["/login"]);
      return true;
    }
    return false;
  }


  getProductos():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.productoUrl+'/listar');
  }

  getCategoria():Observable<ProductCategory[]>{
    return this.httpClient.get<ProductCategory[]>(this.productoUrl+'/categorias');
  }

  crearProducto(producto: Producto):Observable<Producto>{
    return this.httpClient.post<Producto>(this.productoUrl+'/crear', producto);
  }

  obtenerProductosId(id: number):Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoUrl+'/'+id);
  }

  actualizarProducto(producto: Producto):Observable<Producto>{
    return this.httpClient.put<Producto>(this.productoUrl+'/actualizar/'+producto.id, producto);
  }

  eliminarProductos(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.productoUrl+'/eliminar/'+id);
  }

  getProduct(theProductId: number): Observable<Producto> {

    //construir url basada en el id del producto
    const producturl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Producto>(producturl);
  }
  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    //POR HACER SI ES QUE LO LEES GIO: se necesita construir una url basada en el id de categoria 
    //pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  getProductList(theCategoryId: number): Observable<Producto[]> {

    //POR HACER SI ES QUE LO LEES GIO: se necesita construir una url basada en el id de categoria 

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);

  }

  searchProductos(theKeyword: string): Observable<Producto[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
                          thePageSize: number,
                          theKeyword: string): Observable<GetResponseProducts> {

    //POR HACER SI ES QUE LO LEES GIO: se necesita construir una url basada en el id de categoria 
    //pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  private getProducts(searchUrl: string): Observable<Producto[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Producto[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}