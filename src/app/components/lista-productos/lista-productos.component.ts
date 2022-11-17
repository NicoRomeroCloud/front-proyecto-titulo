import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/common/producto';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productosgrid.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  products: Producto[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //nuevas propiedades para la paginacipn de productos
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElemnts: number = 0;
  
  previousKeyword: string = "";


  constructor(private productService: ProductoServicioService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    
    if (this.searchMode) {
      this.handleSearchProducts();
    }else{

      this.handleListProducts();

    }
  }
  handleSearchProducts() {
    
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
  
    // si tenemos una palabra en el buscador diferente que el anterior
    // entonces queremos establecer el numero de pagina en 1

     if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
     }
     this.previousKeyword = theKeyword;

     console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);


    //busqueda de productos usando la palabra clave dada
    this.productService.searchProductsPaginate(this.thePageNumber -1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());


  }

  handleListProducts() {
    //verificar si el "id" es un parámetro válido
    const categoriaID: boolean = this.route.snapshot.paramMap.has('id');

    if (categoriaID) {
      //con el id como parametro string, se convierte a numbero usando el simbolo "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // categoria no validam se tira default
      this.currentCategoryId = 1;
    }


    //verificar si tenemos un categoryid diferente
    //NOTA: ANGULAR REUTILIZARA EL COMPONENTE


    //si tenemos un categoryid diferene al anterior, reestablecemos el numero de pag a 1.
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    //senecesita obtener los productos

    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string){
    this.thePageSize = parseInt(pageSize);
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: any) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElemnts = data.page.totalElements;
    }
  }

}
