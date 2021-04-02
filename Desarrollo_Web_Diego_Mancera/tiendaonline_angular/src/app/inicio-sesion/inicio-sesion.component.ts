import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Http,Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  providers:[DatabaseService]
})
export class InicioSesionComponent implements OnInit {

  constructor(private databaseService : DatabaseService, private router : Router) { }

  ngOnInit() {
  }

  verificarUsuario(email,pswd){
    this.databaseService.getDatos().subscribe(
      (data:Response) => {
        var cumple = false;
        for(var usr of data['usuarios']){
          if((usr.usuario == email) && (usr.password == pswd)){
            cumple = true;
          }
        }
        if(!cumple){
          alert("El nombre de usuario o la contraseña son incorrectos, por favor intente de nuevo");
        }else{
          this.router.navigate(['principal']);
        }
        return cumple;
      }
    )
  }
}
