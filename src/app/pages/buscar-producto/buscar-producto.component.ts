import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { CategoriaSubcategoriaTarjetaComponent } from './categoria-subcategoria-tarjeta/categoria-subcategoria-tarjeta.component';
import { SubcategoriaComponent} from './subcategoria/subcategoria.component';

import {Categoria} from '../../models/categoria.model';
import {Subcategoria } from 'src/app/models/subcategoria.model';

import { NgFor, NgIf } from '@angular/common';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { ProvinciaService } from 'src/app/services/provincia/provincia.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CategoriaSubcategoriaTarjetaComponent, NgFor, NgIf, SubcategoriaComponent],

})
export class BuscarProductoComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;
  faArrowLeft = faArrowLeft;

  lista_categories: Categoria[] = [];
  lista_subcategories: Subcategoria[] = [];
  lista_filterprovinciasIds: any[]= [];


  inSubCategoria:boolean = false;
  clickedSubCategoria:boolean = false;
  isProvinciasFilterActive:boolean = false;

  nombreCategoriaActual = new String("");
  nombreSubCategoriaActual = new String("");

  private provinciasServiceSubscription: Subscription | undefined;

  public searchForm = new FormGroup({
    searchBar: new FormControl(''),
  });
  constructor(public categoriaService: CategoriaService, private router: Router, public proveedorService: ProveedorService, 
    public provinciasService:ProvinciaService)
  {

    
  }
  ngOnInit() {


    this.proveedorService.set_categoriaFilterOn("False");
    this.proveedorService.set_subcategoriaFilterOn("False");
    this.proveedorService.set_nombreProveedorFilterOn("False");
    this.proveedorService.set_provinciasFilterOn("False");


    this.proveedorService.set_categoriaNombre("");
    this.proveedorService.set_subcategoriaNombre("");
    this.proveedorService.set_nombreProveedor("");
    this.proveedorService.set_lista_filterprovinciasIds([]);

    //Inicializado esto en string vacio cada vez que se carga el componente
    this.categoriaService.setCategoriaActual(new Categoria("",""))  ;
    this.categoriaService.setsubCategoriaActual(new Subcategoria(""))  ;

    //Si esta condicion es verdadera, quiere decir que estamos en las categorias, caso contrario en las subcategorias
    //this.inSubCategoria = (this.categoriaService.getCategoriaActual() as Categoria).nombre != ""
    //if(this.inSubCategoria){ this.nombreCategoriaActual = (this.categoriaService.getCategoriaActual() as Categoria).nombre }

    //console.log("Nombre Cat" + this.nombreCategoriaActual );

    this.categoriaService.getCategorias().subscribe(
      {
        

        next: value => 
        {
          this.lista_categories = value as Categoria[];
          
          console.log(this.lista_categories)
        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
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
          
        }
      );
    
    
  }


  ngOnDestroy(): void {
    this.provinciasServiceSubscription?.unsubscribe();
  }

 
 
  
  //Esto se activa cuando en el componente hijo se clickea alguna de las tarjetas de la categoria
  GetInSubCategoria(isCategoriaReceived:boolean)
  {
    console.log(this.inSubCategoria);
    console.log(isCategoriaReceived);

    this.inSubCategoria = isCategoriaReceived;
    if(this.inSubCategoria){ this.nombreCategoriaActual = (this.categoriaService.getCategoriaActual() as Categoria).nombre }


    //EN CASO DE QUE LA CATEGORIA SEA VARIOS  YA QUE NOTIENE SUBCATEGORIA QUE REDIRIJA DIRECTAMENTE
    if(this.nombreCategoriaActual == "VARIOS")
    {
      this.proveedorService.set_categoriaFilterOn("True");
      this.proveedorService.set_subcategoriaFilterOn("False");
      this.proveedorService.set_nombreProveedorFilterOn("False");
      
      this.proveedorService.set_provinciasFilterOn(this.isProvinciasFilterActive);

      this.proveedorService.set_categoriaNombre("VARIOS");
      this.proveedorService.set_nombreProveedor("");
      this.proveedorService.set_subcategoriaNombre("");
      this.proveedorService.set_lista_filterprovinciasIds(this.lista_filterprovinciasIds);

      this.router.navigate(['inicio/busqueda']);

    }

    const categoriaForm = new FormData();

    categoriaForm.append('categoria',this.categoriaService.getCategoriaActual().nombre as string);

    this.categoriaService.getSubcategoriasInCategoria(categoriaForm).subscribe(
      {
        

        next: value => 
        {
          this.lista_subcategories = value as any as Subcategoria[];
          
          console.log(this.lista_subcategories)
        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })
    //Aqui mismo se deberia hacer una consulta hacia el back par llenar la informacion de las subcategorias de acuerdo a la categoria elegida
    
  }

    //Esto se activa cuando en el componente hijo se clickea alguna de las tarjetas de la subategoria

  ClickedSubCategoria(isSubCategoriaReceived:boolean)
  {
    console.log(this.clickedSubCategoria);
    console.log(isSubCategoriaReceived);


    

    this.clickedSubCategoria = isSubCategoriaReceived;
    if(this.clickedSubCategoria){ this.nombreSubCategoriaActual = (this.categoriaService.getSubcategoriaActual() as Subcategoria).nombre }


    this.proveedorService.set_categoriaFilterOn("True");
    this.proveedorService.set_subcategoriaFilterOn("True");
    this.proveedorService.set_nombreProveedorFilterOn("False");
    this.proveedorService.set_provinciasFilterOn(this.isProvinciasFilterActive);

    this.proveedorService.set_categoriaNombre(this.nombreCategoriaActual);
    this.proveedorService.set_subcategoriaNombre( this.nombreSubCategoriaActual);
    this.proveedorService.set_nombreProveedor("");
    this.proveedorService.set_lista_filterprovinciasIds(this.lista_filterprovinciasIds);

    this.router.navigate(['inicio/busqueda']);

    
  }


  //Boton para retroceder y mostrar las categorias
  getBackButton()
  {

    this.inSubCategoria = this.inSubCategoria && this.clickedSubCategoria;

    if( !this.inSubCategoria)
    {
      this.categoriaService.setCategoriaActual(new Categoria("",""))
    }


    this.clickedSubCategoria = false;
    if( !this.inSubCategoria)
    {
      this.categoriaService.setsubCategoriaActual(new Subcategoria(""))
    }
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
    this.router.navigate(['inicio/busqueda']);

  }
}
