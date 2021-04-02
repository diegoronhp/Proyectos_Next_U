import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { CatalogoProductosComponent } from './catalogo-productos/catalogo-productos.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    PaginaPrincipalComponent,
    BarraNavegacionComponent,
    DetallesProductoComponent,
    CatalogoProductosComponent,
    CarritoComprasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
