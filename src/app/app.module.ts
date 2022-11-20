import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductoServicioService } from './services/producto-servicio.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes =[
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ListaProductosComponent},
  {path: 'category/:id', component: ListaProductosComponent},
  {path: 'category', component: ListaProductosComponent},
  {path: 'products', component: ListaProductosComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'  },
  {path: '**', redirectTo: '/products', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CheckoutComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductoServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
