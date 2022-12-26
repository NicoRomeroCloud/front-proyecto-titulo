import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { ProductCategory } from 'src/app/common/product-category';
import { Producto } from 'src/app/common/producto';
import { CartService } from 'src/app/services/cart.service';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  products: Producto[] = [];
  currentCategoryId: number = 0;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElemnts: number = 0;
  
  previousKeyword: string = null;

  constructor(private productoService: ProductoServicioService, private productService: ProductoServicioService,
    private route: ActivatedRoute,
    private cartService: CartService) { 

   }

  ngOnInit(): void {
    this.listProductCategories();
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProductCategories() {
    this.productoService.getProductCategories().subscribe(
      data => {
        console.log('Categorias Productos= ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
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
      this.currentCategoryId = parseInt(this.route.snapshot.paramMap.get('id')!);
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

    // console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    //senecesita obtener los productos

    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return data =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElemnts = data.page.totalElements;
    }
  }

  addToCart(theProduct: Producto){

    // console.log(`añadiendo al carrito: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

    Swal.fire(
      'Producto añadido!',
      '',
      'success'
    )

  }

}
