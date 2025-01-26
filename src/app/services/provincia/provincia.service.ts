import { Injectable } from '@angular/core';
import {Categoria} from '../../models/categoria.model'
import {Subcategoria} from '../../models/subcategoria.model'
import { Router } from '@angular/router';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Provincia} from '../../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private listOfProvinciasSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly listOfProvincias: Observable<any[]> = this.listOfProvinciasSubject.asObservable();


  
  constructor(public router:Router, private http: HttpClient) { }


  setlistOfProvinciasObservable(listOfProvinciasParam: any[]): void {
    console.log("Services Provincias ");
    console.log(listOfProvinciasParam);
    this.listOfProvinciasSubject.next(listOfProvinciasParam);
  }
  
  getAllProvincias() {
    let url = URL_SERVICIOS.provincias;
    let httpOptions = {
      headers: new HttpHeaders({
        //'Authorization': 'Bearer '+this._usuarioService.getToken(),
      })
    }
    return this.http.get(url,httpOptions);
    }

    crearProveedorProvincia(proveedorProvincias:FormData):Observable<FormData>
    {
  
      let url = URL_SERVICIOS.proveedorProvincias;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.post<FormData>(url, proveedorProvincias)
      
    }

    deleteProveedorProvinciaRegister(provinciasList:FormData, id_proveedor:String):Observable<FormData>{

      console.log(id_proveedor)
      let url = URL_SERVICIOS.proveedorProvinciasViewSet  + '/' + id_proveedor + '/' ;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.put<FormData>(url, provinciasList)
    }  
}
