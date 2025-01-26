import { Component,Input, Output,OnInit, EventEmitter } from '@angular/core';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model'
import URL_SERVICIOS from 'src/app/config/config';
import { NgFor, NgIf } from '@angular/common';
import { EnlacesProveedor } from 'src/app/models/enlacesProveedor.model';

@Component({
  selector: 'app-proveedor-tarjeta',
  templateUrl: './proveedor-tarjeta.component.html',
  styleUrls: ['./proveedor-tarjeta.component.css'],
  standalone: true,
  imports: [NgIf,NgFor],


})
export class ProveedorTarjetaComponent  implements OnInit {

  @Input() productoServicioNegocio!: ProductoServicioNegocio;
  listaCategorias:String []= [];  
  listaSubcategorias:String []= []; 

  listaCategoriasString:String ="";
  listasubCategoriasString:String ="";
  listOfLinks:EnlacesProveedor[] = [];
  listaProvincias:String [] = [];

  url_backend: string = URL_SERVICIOS.url_static;

  ngOnInit()
  {
    console.log(this.productoServicioNegocio)

    this.listOfLinks = this.productoServicioNegocio.enlaces as EnlacesProveedor[];

    console.log(this.listOfLinks);
    if(this.productoServicioNegocio.provincia != undefined)
      {
  
        console.log(this.productoServicioNegocio.provincia)
        for (var provincia of this.productoServicioNegocio.provincia) 
        {
          this.listaProvincias.push(provincia.provincia_name);
        }
        console.log(this.listaProvincias)
      }
      
    if(this.productoServicioNegocio.categoria != undefined)
    {

      for (var categoria of this.productoServicioNegocio.categoria) 
      {
        this.listaCategorias.push(categoria);
      }
    }


    if(this.productoServicioNegocio.subcategorias != undefined)
    {

      for (var subcategoria of this.productoServicioNegocio.subcategorias) 
      {
        this.listaSubcategorias.push(subcategoria);
        console.log("Esta es la subcategoria" + subcategoria)
      }
    }


    this.listaCategoriasString = this.listaCategorias.toString();
    this.listasubCategoriasString = this.listaSubcategorias.toString() ;

   console.log("Lista de categorias String" + this.listasubCategoriasString)
   console.log("Lista de categorias Lista" + this.listaSubcategorias)

  }
}
