import { Component,Input, Output,OnInit, EventEmitter } from '@angular/core';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model'
import URL_SERVICIOS from 'src/app/config/config';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-proveedor-tarjeta',
  templateUrl: './proveedor-tarjeta.component.html',
  styleUrls: ['./proveedor-tarjeta.component.css'],
  standalone: true,
  imports: [NgIf],

})
export class ProveedorTarjetaComponent  implements OnInit {

  @Input() productoServicioNegocio!: ProductoServicioNegocio;
  listaCategorias:String []= [];  
  listaSubcategorias:String []= []; 

  listaCategoriasString:String ="";
  listasubCategoriasString:String ="";
  url_backend: string = URL_SERVICIOS.url_static;

  ngOnInit()
  {
    console.log(this.productoServicioNegocio)

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
