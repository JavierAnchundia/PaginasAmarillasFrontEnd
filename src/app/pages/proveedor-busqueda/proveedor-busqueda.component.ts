import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ProveedorService } from '../../services/proveedor/proveedor.service';

import {Categoria} from '../../models/categoria.model';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model';

import {Subcategoria } from 'src/app/models/subcategoria.model';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ProveedorTarjetaComponent} from '../proveedor-tarjeta/proveedor-tarjeta.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor-busqueda',
  templateUrl: './proveedor-busqueda.component.html',
  styleUrls: ['./proveedor-busqueda.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf, ProveedorTarjetaComponent],

})
export class ProveedorBusquedaComponent implements OnInit {

  inSubCategoria:boolean = false;
  clickedSubCategoria:boolean = false;

  nombreCategoriaActual = new String("");
  nombreSubCategoriaActual = new String("");


  lista_categories: Categoria[] = [];
  lista_subcategories: Subcategoria[] = [];
  lista_productoServicioNegocio: ProductoServicioNegocio[] = [];


  constructor(public categoriaService: CategoriaService,private router: Router, public proveedorService: ProveedorService)
  {

    
  }

  ngOnInit() 
  {
    this.inSubCategoria = (this.categoriaService.getCategoriaActual() as Categoria).nombre != ""
    this.clickedSubCategoria = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre != ""


    

    if(this.inSubCategoria){ this.nombreCategoriaActual = (this.categoriaService.getCategoriaActual() as Categoria).nombre }
    if(this.clickedSubCategoria){ this.nombreSubCategoriaActual = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre }



    const proveedorParams = new FormData();

      
    proveedorParams.append('categoriaFilterOn',this.proveedorService.get_categoriaFilterOn());
    proveedorParams.append('subcategoriaFilterOn',this.proveedorService.get_subcategoriaFilterOn());
    proveedorParams.append('nombreProveedorFilterOn', this.proveedorService.get_nombreProveedorFilterOn());

    proveedorParams.append('nombreCategoria',this.proveedorService.get_categoriaNombre());
    proveedorParams.append('nombreProveedor', this.proveedorService.get_nombreProveedor());
    proveedorParams.append('nombreSubcategoria', this.proveedorService.get_subcategoriaNombre());
   
      
      this.proveedorService.getProveedoresFilter(proveedorParams).subscribe((data:any) => {

          
          this.lista_productoServicioNegocio = data;
       
          console.log(data)


          /*this.id_camposanto = data['id_camposanto']
          this.postCoordenadas();
          let lenCadena = String(this.redList.value[0].redSocial);
          if(this.redList.length>0 || lenCadena.length>0){
            this.postRedesSociales();
          }*/
      })
    //Leer del BackEnd la info que se va a traer
   

  }


  onPressedBackButton()
  {

    this.router.navigate(['inicio/buscarProducto']);
  }

}
