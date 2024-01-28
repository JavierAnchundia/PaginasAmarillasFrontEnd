import { Injectable } from '@angular/core';
import {Categoria} from '../../models/categoria.model'
import {Subcategoria} from '../../models/subcategoria.model'
import { Router } from '@angular/router';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  public categoriaActual = new Categoria("", "");
  public subcategoriaActual = new Subcategoria("");

  constructor(public router:Router, private http: HttpClient,/*private _usuarioService: UsuarioService*/) { }

  getCategoriaActual()
  {
    return this.categoriaActual;
  }

  setCategoriaActual(Categoria:Categoria)
  {

    this.categoriaActual = Categoria;
    console.log(this.categoriaActual);
  }

  getSubcategoriaActual()
  {
    return this.subcategoriaActual;
  }

  setsubCategoriaActual(Subcategoria:Subcategoria)
  {

    this.subcategoriaActual = Subcategoria;
    console.log(this.subcategoriaActual);
  }


  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
   console.log("Current route I am on:",this.router.url);
   const url=self ? this.router.url :urlToNavigateTo;
   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
     this.router.navigate([`/${url}`]).then(()=>{
       console.log(`After navigation I am on:${this.router.url}`);
       
     })
   })
 }


 getCategorias() {
  let url = URL_SERVICIOS.categorias;
  let httpOptions = {
    headers: new HttpHeaders({
      //'Authorization': 'Bearer '+this._usuarioService.getToken(),
    })
  }
  return this.http.get(url,httpOptions);
  }

  getSubcategoriasByCategoria(categoria: String) {
    let url = URL_SERVICIOS.subcategorias + categoria + '/';

    return this.http.get(url)
  }

  getSubcategoriasInCategoria(categoriaForm:FormData):Observable<FormData>{
    let url = URL_SERVICIOS.subcategorias;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<FormData>(url, categoriaForm)
  }

  crearProveedorCategoriaSubcategoria(categoriaSubcategoria:FormData):Observable<FormData>
  {

    let url = URL_SERVICIOS.proveedorCategoriasSubcategorias;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<FormData>(url, categoriaSubcategoria)
    
  }
 /*getCategoriasData(reviews:FormData):Observable<FormData>{
  let url = URL_SERVICIOS.reviews;
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  return this.http.post<FormData>(url, reviews)
}
*/
}
