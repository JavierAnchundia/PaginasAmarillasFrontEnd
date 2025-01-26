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
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvinciaService } from 'src/app/services/provincia/provincia.service';
import { Subscription } from 'rxjs';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-postulantes-proveedores',
  templateUrl: './admin-postulantes-proveedores.component.html',
  styleUrls: ['./admin-postulantes-proveedores.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,FontAwesomeModule, NgFor, NgIf, AdministrarProveedorTarjetaComponent],
})
export class AdminPostulantesProveedoresComponent {

  inSubCategoria:boolean = false;
  clickedSubCategoria:boolean = false;

  faMagnifyingGlass = faMagnifyingGlass;
  faArrowLeft = faArrowLeft;

  nombreCategoriaActual = new String("");
  nombreSubCategoriaActual = new String("");


  lista_categories: Categoria[] = [];
  lista_subcategories: Subcategoria[] = [];
  lista_productoServicioNegocio: ProductoServicioNegocio[] = [];
  lista_filterprovinciasIds: any[]= [];


  isProvinciasFilterActive:boolean = false;
  private provinciasServiceSubscription: Subscription | undefined;

  public searchForm = new FormGroup({
    searchBar: new FormControl(''),
  });


  constructor(public categoriaService: CategoriaService,private router: Router,private proveedorService: ProveedorService,
    public provinciasService:ProvinciaService
  )
  {

    
  }

  ngOnInit() 
  {

     //  /routename

    this.inSubCategoria = (this.categoriaService.getCategoriaActual() as Categoria).nombre != ""
    this.clickedSubCategoria = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre != ""


    

    if(this.inSubCategoria){ this.nombreCategoriaActual = (this.categoriaService.getCategoriaActual() as Categoria).nombre }
    if(this.clickedSubCategoria){ this.nombreSubCategoriaActual = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre }


    this.proveedorService.getAllPostulantesProveedores().subscribe((data:any) => {

      console.log(data)
      this.lista_productoServicioNegocio = data;
  
    })


    //METODO QUE PERMITE SUBSCRIBIRME A LOS CAMBIOS EN EL LISTADO DE PROVINCIAS
    this.provinciasServiceSubscription = this.provinciasService.listOfProvincias.subscribe(
      listOfIdsProvinces => {

       
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
        

    this.proveedorService.set_categoriaFilterOn("False");
    this.proveedorService.set_subcategoriaFilterOn("False");

    if(this.searchForm.value.searchBar!= null && this.searchForm.value.searchBar != "" )
    {
        this.proveedorService.set_nombreProveedorFilterOn("True");

    }
    else
    {
        this.proveedorService.set_nombreProveedorFilterOn("False");

    }

    this.proveedorService.set_provinciasFilterOn(this.isProvinciasFilterActive);


    this.proveedorService.set_categoriaNombre("");
    this.proveedorService.set_subcategoriaNombre( "");
    this.proveedorService.set_nombreProveedor(this.searchForm.value.searchBar );
    this.proveedorService.set_lista_filterprovinciasIds(this.lista_filterprovinciasIds);

    console.log(this.searchForm.value.searchBar );
    
    const proveedorParams = new FormData();

      
    proveedorParams.append('categoriaFilterOn',this.proveedorService.get_categoriaFilterOn());
    proveedorParams.append('subcategoriaFilterOn',this.proveedorService.get_subcategoriaFilterOn());
    proveedorParams.append('nombreProveedorFilterOn', this.proveedorService.get_nombreProveedorFilterOn());
    proveedorParams.append('provinciasFilterOn', this.proveedorService.get_provinciasFilterOn());

    proveedorParams.append('nombreCategoria',this.proveedorService.get_categoriaNombre());
    proveedorParams.append('nombreProveedor', this.proveedorService.get_nombreProveedor());
    proveedorParams.append('nombreSubcategoria', this.proveedorService.get_subcategoriaNombre());
    proveedorParams.append('listaProvinciasId', this.proveedorService.get_lista_filterprovinciasIds().toString());
    proveedorParams.append('tipoProveedor', "Pendiente");

      
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
      }
    );
    //Leer del BackEnd la info que se va a traer
    

  }

  ngOnDestroy(): void {
    this.provinciasServiceSubscription?.unsubscribe();
  }

  onPressedBackButton()
  {

    this.router.navigate(['inicio/buscarProducto']);
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value

    
    this.proveedorService.set_categoriaFilterOn("False");
    this.proveedorService.set_subcategoriaFilterOn("False");
    this.proveedorService.set_nombreProveedorFilterOn("True");
    
    this.proveedorService.set_provinciasFilterOn(this.isProvinciasFilterActive);

    this.proveedorService.set_categoriaNombre("");
    this.proveedorService.set_subcategoriaNombre( "");
    this.proveedorService.set_nombreProveedor(this.searchForm.value.searchBar );
    this.proveedorService.set_lista_filterprovinciasIds(this.lista_filterprovinciasIds);

    console.log(this.searchForm.value.searchBar );
    
    const proveedorParams = new FormData();

      
    proveedorParams.append('categoriaFilterOn',this.proveedorService.get_categoriaFilterOn());
    proveedorParams.append('subcategoriaFilterOn',this.proveedorService.get_subcategoriaFilterOn());
    proveedorParams.append('nombreProveedorFilterOn', this.proveedorService.get_nombreProveedorFilterOn());
    proveedorParams.append('provinciasFilterOn', this.proveedorService.get_provinciasFilterOn());

    proveedorParams.append('nombreCategoria',this.proveedorService.get_categoriaNombre());
    proveedorParams.append('nombreProveedor', this.proveedorService.get_nombreProveedor());
    proveedorParams.append('nombreSubcategoria', this.proveedorService.get_subcategoriaNombre());
    proveedorParams.append('listaProvinciasId', this.proveedorService.get_lista_filterprovinciasIds().toString());
    proveedorParams.append('tipoProveedor', "Pendiente");

      
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
  }
}
