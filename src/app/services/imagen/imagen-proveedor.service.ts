import { Injectable } from '@angular/core';
import {Categoria} from '../../models/categoria.model'
import {Subcategoria} from '../../models/subcategoria.model'
import { Router } from '@angular/router';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenProveedorService {

  constructor(public router:Router, private http: HttpClient,) { }


  
  
  createImagenProducto(img_producto: FormData):Observable<FormData> {
    console.log(img_producto)
    const url = URL_SERVICIOS.imagen_proveedor;

    /*const req = new HttpRequest('POST', url, img_producto, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);*/

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<FormData>(url, img_producto)
  }
}
