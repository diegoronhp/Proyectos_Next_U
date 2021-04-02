import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  carrito = [];

  constructor(){
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
  }
}
