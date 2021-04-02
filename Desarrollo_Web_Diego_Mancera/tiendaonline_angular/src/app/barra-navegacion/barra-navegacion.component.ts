import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PaginaPrincipalComponent } from '../pagina-principal/pagina-principal.component';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})

export class BarraNavegacionComponent implements OnInit {

  cantProductos = 0;
  barraVisible = false;
  @Output() showCart = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(this.cantProductos == 0){
      this.barraVisible = false;
    }else{
      this.barraVisible = true;
    }
  }

  actualizarProductos(){
    this.cantProductos = JSON.parse(localStorage.getItem('carrito')).length;
    if(this.cantProductos == 0){
      this.barraVisible = false;
    }else{
      this.barraVisible = true;
    }
  }

  mostrarCarrito(){
    this.showCart.emit();
  }

}
