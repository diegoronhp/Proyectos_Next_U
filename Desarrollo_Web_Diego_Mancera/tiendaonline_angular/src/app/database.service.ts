import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DatabaseService {

  constructor(private http:Http) { }

  getDatos(){
    return this.http.get("https://tienda-on-line-cuatro.firebaseio.com/.json")
      .map((response:Response)=>response.json());
  }

  sendDatos(data:any){
    const datos = JSON.stringify(data);
    return this.http.put("https://tienda-on-line-cuatro.firebaseio.com/.json",datos)
      .map((response:Response) => response.json());
  }
}
