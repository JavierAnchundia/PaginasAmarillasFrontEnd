import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import {Categoria} from '../../models/categoria.model';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model';
import { ProveedorService } from '../../services/proveedor/proveedor.service';

import {Subcategoria } from 'src/app/models/subcategoria.model';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdministrarProveedorTarjetaComponent} from '../administrar-proveedor-tarjeta/administrar-proveedor-tarjeta.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-proveedor',
  templateUrl: './administrar-proveedor.component.html',
  styleUrls: ['./administrar-proveedor.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf, AdministrarProveedorTarjetaComponent],
})
export class AdministrarProveedorComponent {

  inSubCategoria:boolean = false;
  clickedSubCategoria:boolean = false;

  nombreCategoriaActual = new String("");
  nombreSubCategoriaActual = new String("");


  lista_categories: Categoria[] = [];
  lista_subcategories: Subcategoria[] = [];
  lista_productoServicioNegocio: ProductoServicioNegocio[] = [];


  constructor(public categoriaService: CategoriaService,private router: Router, private proveedorService: ProveedorService)
  {

    
  }

  ngOnInit() 
  {
    this.inSubCategoria = (this.categoriaService.getCategoriaActual() as Categoria).nombre != ""
    this.clickedSubCategoria = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre != ""


    

    if(this.inSubCategoria){ this.nombreCategoriaActual = (this.categoriaService.getCategoriaActual() as Categoria).nombre }
    if(this.clickedSubCategoria){ this.nombreSubCategoriaActual = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre }


    this.proveedorService.getAllActiveProveedores().subscribe((data:any) => {

          
      this.lista_productoServicioNegocio = data;
  
  })

    //Leer del BackEnd la info que se va a traer
    

  }


  onPressedBackButton()
  {

    this.router.navigate(['inicio/buscarProducto']);
  }


  onPressedAgregarNuevoRegistro()
  {

    this.router.navigate(['inicio/crearProveedor']);
  }


 
}
