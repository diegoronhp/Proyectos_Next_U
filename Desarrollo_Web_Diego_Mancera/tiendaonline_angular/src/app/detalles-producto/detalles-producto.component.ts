import { Component, OnInit } from '@angular/core';
import { PaginaPrincipalComponent } from '../pagina-principal/pagina-principal.component';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  Producto = '';
  constructor(private principal:PaginaPrincipalComponent) { }

  ngOnInit() {
    this.Producto = JSON.parse(localStorage.getItem('productoActual'));
  }

  retornar(){
    this.principal.cambiarVisibilidad();
  }

}
