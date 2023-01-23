// import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

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
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import{
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { OktaAuth } from "@okta/okta-auth-js";

import myAppConfig from './config/my-app-config';
import { Checkout2Component } from './components/checkout2/checkout2.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { FormsModule } from '@angular/forms';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { Login2Component } from './components/login2/login2.component';
import { Login2StatusComponent } from './components/login2-status/login2-status.component';
import { ProductosCrudComponent } from './components/productos-crud/productos-crud.component';
import { ProductosCrudFormComponent } from './components/productos-crud-form/productos-crud-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { MatSliderModule } from "@angular/material/slider";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { LinkperfilComponent } from './components/linkperfil/linkperfil.component';
import { FormeditarComponent } from './components/formeditar/formeditar.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

import { NgxPayPalModule } from 'ngx-paypal';

import { NgxSpinnerModule } from 'ngx-spinner';
import { PdfComponent } from './components/pdf/pdf.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { SafePipe } from './safe.pipe';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CheckoutComponent,
    CartDetailsComponent,
    LoginComponent,
    LoginStatusComponent,
    Checkout2Component,
    NopagefoundComponent,
    HomeComponent,
    ClientesComponent,
    FormClientesComponent,
    PerfilClienteComponent,
    Login2Component,
    Login2StatusComponent,
    ProductosCrudComponent,
    ProductosCrudFormComponent,
    LoginFormComponent,
    PerfilusuarioComponent,
    LinkperfilComponent,
    FormeditarComponent,
    OrderHistoryComponent,
    PdfComponent,
    DetalleProductoComponent,
    SafePipe,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    AppRoutingModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPayPalModule,
    NgxSpinnerModule
  ],
  providers: [ProductoServicioService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }
