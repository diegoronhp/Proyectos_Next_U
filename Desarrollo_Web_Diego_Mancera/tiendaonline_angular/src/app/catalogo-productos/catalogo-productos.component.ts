import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { PaginaPrincipalComponent } from '../pagina-principal/pagina-principal.component';
import { Http,Response } from '@angular/http';

@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.css'],
  providers:[DatabaseService]
})

export class CatalogoProductosComponent implements OnInit {
  Productos;
  carrito = JSON.parse(localStorage.getItem('carrito'));

  constructor(private databaseService:DatabaseService, private principal:PaginaPrincipalComponent ) { this.onChange('')}

  ngOnInit() {
  }

  onChange(element){
    this.databaseService.getDatos().subscribe(
      (data:Response)=>{
        this.Productos=[];
        for(var producto of data['productos']){
          if(element == ""){
            this.Productos.push(producto);
          }else if(producto.nombre.includes(element)){
            this.Productos.push(producto);
          }
        }
      }
    )
  }

  verProducto(nombre){
    for(var producto of this.Productos){
      if(producto.nombre == nombre){
        localStorage.setItem('productoActual',JSON.stringify(producto));
        this.principal.cambiarVisibilidad();
        return;
      }
    }
  }

  agregarCarrito(nombre,cantidad){
    for(var producto of this.Productos){
      if(producto.nombre == nombre){
        var subtotal = producto.precio * cantidad;
        var item = JSON.parse(`{"nombre":"${producto.nombre}","subtotal":"${subtotal}","cantidad":"${cantidad}"}`);
        this.carrito.push(item);
        localStorage.setItem('carrito',JSON.stringify(this.carrito));
        this.principal.actualizarCarrito();
      }
    }
  }

}
