import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ListaProductosComponent},
  {path: 'category/:id', component: ListaProductosComponent},
  {path: 'category', component: ListaProductosComponent},
  {path: 'products', component: ListaProductosComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'  },
  {path: '**', component: NopagefoundComponent},
  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot( routes )],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
