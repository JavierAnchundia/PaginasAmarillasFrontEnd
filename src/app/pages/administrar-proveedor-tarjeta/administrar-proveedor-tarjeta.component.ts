import { Component,Input, Output,OnInit, EventEmitter } from '@angular/core';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model'
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {ProveedorService} from '../../services/proveedor/proveedor.service';
import URL_SERVICIOS from 'src/app/config/config';

@Component({
  selector: 'app-administrar-proveedor-tarjeta',
  templateUrl: './administrar-proveedor-tarjeta.component.html',
  styleUrls: ['./administrar-proveedor-tarjeta.component.css'],
  standalone: true,
  imports: [ NgIf],
})
export class AdministrarProveedorTarjetaComponent {

  @Input() productoServicioNegocio!: ProductoServicioNegocio;
  listaCategorias:String []= [];  
  listaSubcategorias:String []= []; 

  listaCategoriasString:String ="";
  listasubCategoriasString:String ="";

  imOnAdministrarPostulante:boolean = false;
  url_backend: string = URL_SERVICIOS.url_static;

  constructor(private router: Router, private proveedorService:ProveedorService)
  {

    
  }

  ngOnInit()
  {
   

    this.imOnAdministrarPostulante = this.router.url == "/inicio/administrarPostulantes";
    console.log(this.imOnAdministrarPostulante);
    console.log(this.router.url);

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

  
  onDeleteClicked()
  {

    const proveedorParams = new FormData();

    proveedorParams.append('ruc_cedula',this.productoServicioNegocio.ruc_cedula as string);
    proveedorParams.append('razon_social',this.productoServicioNegocio.razon_social  as string);
    proveedorParams.append('telefono',this.productoServicioNegocio.telefono as string);

    proveedorParams.append('correo',this.productoServicioNegocio.correo as string);
    proveedorParams.append('provincia', this.productoServicioNegocio.provincia as string);
    proveedorParams.append('ciudad', this.productoServicioNegocio.ciudad as string);
    proveedorParams.append('descripcion', this.productoServicioNegocio.descripcion as string);
    proveedorParams.append('state', "Inactivo");

  
      this.proveedorService.updateAndLogicalDeleteProveedorPostulante(proveedorParams,this.productoServicioNegocio.id_proveedor).subscribe((data:any) => {
        
        window.location.reload()

      })

    
  }

  onPressedEditarRegistro()
  {

    console.log(this.productoServicioNegocio.id_proveedor)
    this.proveedorService.set_ProductoServicioNegocioEdit(this.productoServicioNegocio);
    this.router.navigate(['inicio/editarProveedor']);
  }
}
