import { Injectable } from '@angular/core';
import {Categoria} from '../../models/categoria.model'
import {Subcategoria} from '../../models/subcategoria.model'
import { Router } from '@angular/router';
import URL_SERVICIOS from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductoServicioNegocio } from 'src/app/models/productoServicioNegocio.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  

  public nombreProveedorFilterOn = "False";
  public categoriaFilterOn = "False";
  public subcategoriaFilterOn = "False";
  public provinciasFilterOn = "False";

  public nombreProveedor = "";
  public categoriaNombre = "";
  public subcategoriaNombre = "";
  public lista_filterprovinciasIds: any[]= [];


  public productoServicioNegocioEdit:ProductoServicioNegocio = {} as ProductoServicioNegocio
 

  
  constructor(public router:Router, private http: HttpClient,/*private _usuarioService: UsuarioService*/) { }


  get_ProductoServicioNegocioEdit()
  {

    return this.productoServicioNegocioEdit;

  }


  
  set_ProductoServicioNegocioEdit(productoServicioNegocioEdit:ProductoServicioNegocio)
  {

    console.log(productoServicioNegocioEdit)
    this.productoServicioNegocioEdit = productoServicioNegocioEdit;

  }


  get_nombreProveedorFilterOn()
  {
    return this.nombreProveedorFilterOn;
  }

  set_nombreProveedorFilterOn(nombreProveedorFilterOn:any)
  {

    this.nombreProveedorFilterOn = nombreProveedorFilterOn;
  }

  get_categoriaFilterOn()
  {
    return this.categoriaFilterOn;
  }

  set_categoriaFilterOn(categoriaFilterOn:any)
  {

    this.categoriaFilterOn = categoriaFilterOn;
  }


  get_subcategoriaFilterOn()
  {
    return this.subcategoriaFilterOn;
  }

  set_subcategoriaFilterOn(subcategoriaFilterOn:any)
  {

    this.subcategoriaFilterOn = subcategoriaFilterOn;
  }


  //GET Y SET PARA LAS PROVINIAS 
  get_provinciasFilterOn()
  {
    return this.provinciasFilterOn;
  }

  set_provinciasFilterOn(provinciasFilterOn:any)
  {

    this.provinciasFilterOn = provinciasFilterOn;
  }

  get_nombreProveedor()
  {
    return this.nombreProveedor;
  }

  set_nombreProveedor(nombreProveedor:any)
  {

    this.nombreProveedor = nombreProveedor;
  }

  get_categoriaNombre()
  {
    return this.categoriaNombre;
  }

  set_categoriaNombre(categoriaNombre:any)
  {

    this.categoriaNombre = categoriaNombre;
  }

  get_subcategoriaNombre()
  {
    return this.subcategoriaNombre;
  }

  set_subcategoriaNombre(subcategoriaNombre:any)
  {

    this.subcategoriaNombre = subcategoriaNombre;
  }


  get_lista_filterprovinciasIds()
  {
    return this.lista_filterprovinciasIds;
  }

  set_lista_filterprovinciasIds(lista_filterprovinciasIds:any)
  {

    this.lista_filterprovinciasIds = lista_filterprovinciasIds;
  }
  
  getAllActiveProveedores():Observable<FormData>{
    let url = URL_SERVICIOS.proveedoresActivosAll;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<FormData>(url)
  }


  getAllPostulantesProveedores():Observable<FormData>{
    let url = URL_SERVICIOS.proveedoresPostulantes;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<FormData>(url)
  }

  getProveedoresFilter(proveedorFilters:FormData):Observable<FormData>{
    let url = URL_SERVICIOS.proveedoresActivosFilter;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<FormData>(url, proveedorFilters)
  }


  postProveedorPostulante(proveedorForm:FormData):Observable<FormData>{
    let url = URL_SERVICIOS.proveedoresPostulantes;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<FormData>(url, proveedorForm)
  }


  updateAndLogicalDeleteProveedorPostulante(proveedorForm:FormData, id_proveedor:String):Observable<FormData>{

    console.log(id_proveedor)
    let url = URL_SERVICIOS.proveedorSetRegistro  + '/' + id_proveedor + '/' ;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put<FormData>(url, proveedorForm)
  }


  getProveedorById( id_proveedor:String):Observable<FormData>{
    let url = URL_SERVICIOS.proveedorSetRegistro  + '/' + id_proveedor + '/' ;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<FormData>(url)
  }

  crearEnlacesProveedor(enlaceProveedorForm:FormData, id_proveedor:String):Observable<FormData>{

    let url = URL_SERVICIOS.proveedorEnlaces  + '/' + id_proveedor + '/' ;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put<FormData>(url, enlaceProveedorForm)
  }

  deleteProveedorEnlacesRegister(enlacesListFormData:FormData, id_proveedor:String):Observable<FormData>{

    let url = URL_SERVICIOS.proveedorDeleteEnlaces  + '/' + id_proveedor + '/' ;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put<FormData>(url, enlacesListFormData)
  }  

  
}
