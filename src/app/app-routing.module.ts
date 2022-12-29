import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { Login2Component } from './components/login2/login2.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductosCrudComponent } from './components/productos-crud/productos-crud.component';
import { ProductosCrudFormComponent } from './components/productos-crud-form/productos-crud-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormClientesComponent, canActivate: [AuthGuard]},
  {path: 'clientes/form/:id', component: FormClientesComponent},

  {path: 'productoscrud', component: ProductosCrudComponent},
  {path: 'formcrudproductos', component: ProductosCrudFormComponent},
  {path: 'formcrudproductos/:id', component: ProductosCrudFormComponent},

  

  {path: 'login', component: Login2Component},



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
