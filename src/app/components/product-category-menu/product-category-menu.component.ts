import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productoService: ProductoServicioService, public authService: AuthService) { 

   }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productoService.getProductCategories().subscribe(
      data => {
        console.log('Categorias Productos= ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
