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
import { Subscription } from 'rxjs';
import { ProvinciaService } from 'src/app/services/provincia/provincia.service';

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
  lista_filterprovinciasIds: any[]= [];

  isProvinciasFilterActive:boolean = false;


  private provinciasServiceSubscription: Subscription | undefined;

  constructor(public categoriaService: CategoriaService,private router: Router, public proveedorService: ProveedorService,
    public provinciasService:ProvinciaService
  )
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
    proveedorParams.append('provinciasFilterOn', this.proveedorService.get_provinciasFilterOn());
  

    proveedorParams.append('nombreCategoria',this.proveedorService.get_categoriaNombre());
    proveedorParams.append('nombreProveedor', this.proveedorService.get_nombreProveedor());
    proveedorParams.append('nombreSubcategoria', this.proveedorService.get_subcategoriaNombre());
    proveedorParams.append('listaProvinciasId', this.proveedorService.get_lista_filterprovinciasIds().toString());
    proveedorParams.append('tipoProveedor', "Activo");

      
      console.log(this.proveedorService.get_lista_filterprovinciasIds().toString())
      console.log(this.proveedorService.get_provinciasFilterOn())

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


      this.provinciasServiceSubscription = this.provinciasService.listOfProvincias.subscribe(
        listOfIdsProvinces => {
  
          console.log("Funcionooo");
          console.log(listOfIdsProvinces);
          if(listOfIdsProvinces.length > 0)
            {
  
              this.lista_filterprovinciasIds = listOfIdsProvinces;
              this.isProvinciasFilterActive = true;
            }
  
          else
          {
            this.lista_filterprovinciasIds = [] as any[];
            this.isProvinciasFilterActive = false;
  
          }
          
  

      this.proveedorService.set_provinciasFilterOn(this.isProvinciasFilterActive);
      this.proveedorService.set_lista_filterprovinciasIds(this.lista_filterprovinciasIds);
  
      
      const proveedorParams = new FormData();
  
        
      proveedorParams.append('categoriaFilterOn',this.proveedorService.get_categoriaFilterOn());
      proveedorParams.append('subcategoriaFilterOn',this.proveedorService.get_subcategoriaFilterOn());
      proveedorParams.append('nombreProveedorFilterOn', this.proveedorService.get_nombreProveedorFilterOn());
      proveedorParams.append('provinciasFilterOn', this.proveedorService.get_provinciasFilterOn());
  
      proveedorParams.append('nombreCategoria',this.proveedorService.get_categoriaNombre());
      proveedorParams.append('nombreProveedor', this.proveedorService.get_nombreProveedor());
      proveedorParams.append('nombreSubcategoria', this.proveedorService.get_subcategoriaNombre());
      proveedorParams.append('listaProvinciasId', this.proveedorService.get_lista_filterprovinciasIds().toString());
      proveedorParams.append('tipoProveedor', "Activo");
  
        
        this.proveedorService.getProveedoresFilter(proveedorParams).subscribe((data:any) => {
  
            
          this.lista_productoServicioNegocio = data;
          console.log(this.lista_productoServicioNegocio);
  
  
            /*this.id_camposanto = data['id_camposanto']
            this.postCoordenadas();
            let lenCadena = String(this.redList.value[0].redSocial);
            if(this.redList.length>0 || lenCadena.length>0){
              this.postRedesSociales();
            }*/
        })
        })
    //Leer del BackEnd la info que se va a traer
   

  }


  onPressedBackButton()
  {

    this.router.navigate(['inicio/buscarProducto']);
  }

}
