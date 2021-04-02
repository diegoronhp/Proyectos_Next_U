import { Component, OnInit, ViewChild } from '@angular/core';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';
import { CatalogoProductosComponent } from '../catalogo-productos/catalogo-productos.component';
import { DetallesProductoComponent  } from '../detalles-producto/detalles-producto.component';
import { CarritoComprasComponent  } from '../carrito-compras/carrito-compras.component';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})

export class PaginaPrincipalComponent implements OnInit {
  catalogoVisible = true;
  detalleVisible = false;
  carritoVisible = false;

  @ViewChild(BarraNavegacionComponent) contador: BarraNavegacionComponent;
  constructor() { }

  ngOnInit() {
  }

  cambiarVisibilidad(){
    this.catalogoVisible = !this.catalogoVisible;
    this.detalleVisible = !this.detalleVisible;
  }

  actualizarCarrito(){
    this.contador.actualizarProductos();
  }

  viewCart():void{
    this.carritoVisible=true;
    this.catalogoVisible=false;
    this.detalleVisible=false;

  }

}
