import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductoServicioService } from './services/producto-servicio.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {path: 'category/:id', component: ListaProductosComponent},
  {path: 'category', component: ListaProductosComponent},
  {path: 'products', component: ListaProductosComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'  },
  {path: '**', redirectTo: '/products', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductoServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }