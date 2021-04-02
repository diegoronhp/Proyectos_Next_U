import { Component, OnInit } from '@angular/core';
import { Http,Response } from '@angular/http';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css'],
  providers:[DatabaseService]
})
export class CarritoComprasComponent implements OnInit {

  Carrito;
  PagoTotal = 0;
  constructor(private databaseService : DatabaseService) { }

  ngOnInit() {
    this.Carrito = JSON.parse(localStorage.getItem('carrito'));
    for(let item of this.Carrito){
      this.PagoTotal += parseInt(item.subtotal);
    }
  }

  pagarCompra(){
    this.databaseService.getDatos().subscribe(
      (data:Response) => {
        for(let carrito of this.Carrito){
          for(let producto of data['productos']){
            if(carrito.nombre == producto.nombre){
              producto.cantidad -= parseInt(carrito.cantidad);
              break;
            }
          }
        }

        this.databaseService.sendDatos(data).subscribe(
          (res:Response) => {
            this.Carrito = [];
            window.location.replace('./principal');
          }
        )
      }
    )
  }



}
