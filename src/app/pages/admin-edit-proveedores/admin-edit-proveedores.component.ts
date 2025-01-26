import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { NavBarService } from '../../services/navBarInfo/nav-bar.service';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { ImagenProveedorService } from '../../services/imagen/imagen-proveedor.service';
import { ProvinciaService } from '../../services/provincia/provincia.service';
import {EnlacesProveedor} from '../../models/enlacesProveedor.model';

import { throwError } from 'rxjs';

import {Categoria} from '../../models/categoria.model';
import {Provincia} from '../../models/provincia.model';

import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model';

import {Subcategoria } from 'src/app/models/subcategoria.model';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdministrarProveedorTarjetaComponent} from '../administrar-proveedor-tarjeta/administrar-proveedor-tarjeta.component'
import { Router,Event } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { initFlowbite } from 'flowbite';


import {initCollapses}from 'flowbite'

@Component({
  selector: 'app-admin-edit-proveedores',
  templateUrl: './admin-edit-proveedores.component.html',
  styleUrls: ['./admin-edit-proveedores.component.css'],
  standalone: true,
  imports: [ ReactiveFormsModule,NgFor, NgIf],
})
export class AdminEditProveedoresComponent implements OnInit {


  images : any = [];
  imagesListForm : Array<File> = [];
  lista_provincias: Provincia[] = [];
  lista_provincias_EstadoOriginal: any[] = [];
  lista_provincias_EstadoFinal: any = [];
  lista_enlacesAntiguos: EnlacesProveedor[] = [];
  lista_enlacesNuevos: EnlacesProveedor[] = [];
  lista_enlacesAntiguosToDelete: EnlacesProveedor[] = [];
  lista_IDsEnlacesAntiguosToDelete: String[] = [];

  productoServicioNegocio: ProductoServicioNegocio = {} as ProductoServicioNegocio;

  postulanteForm = new FormGroup({
    RUCCedula: new FormControl('',Validators.required),
    razonSocial: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    ciudad: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    multiple_files: new FormControl(''),
    fileSource: new FormControl('', ),
    provinciasFormControl: this.formBuilder.array([]),



  

  });

  enlaceForm = new FormGroup({
    tipoEnlace: new FormControl('',Validators.required),
    enlace: new FormControl('',Validators.required),


  });

  constructor(private router: Router, private navBarService:NavBarService, private proveedorService:ProveedorService,
    private imagenProveedorService:ImagenProveedorService, private formBuilder: FormBuilder, public provinciaService:ProvinciaService )
  {

  }
  ngOnInit(): void {

    initFlowbite();
    initCollapses();

    this.provinciaService.getAllProvincias().subscribe(
      {
        

        next: value => 
        {
          console.log(value)
          this.lista_provincias = value as Provincia[];
          for (var provincia of this.lista_provincias) {
            this.provinciasFormControl.push(this.formBuilder.control(''));
          }

          console.log(this.lista_provincias)

        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })

    this.productoServicioNegocio = this.proveedorService.get_ProductoServicioNegocioEdit();

    console.log(this.productoServicioNegocio.id_proveedor as string)
    console.log(this.productoServicioNegocio)
    console.log(this.productoServicioNegocio.enlaces )

    this.lista_enlacesAntiguos = this.productoServicioNegocio.enlaces as EnlacesProveedor[];

    console.log(this.lista_enlacesAntiguos);



    this.postulanteForm.patchValue({
    RUCCedula: this.productoServicioNegocio.ruc_cedula as string,
    razonSocial: this.productoServicioNegocio.razon_social as string,
    telefono: this.productoServicioNegocio.telefono as string,
    correo: this.productoServicioNegocio.correo as string,
    //provincia:this.productoServicioNegocio.provincia as string,
    ciudad: this.productoServicioNegocio.ciudad as string,
    descripcion: this.productoServicioNegocio.descripcion as string,
    
    });

    this.proveedorService.getProveedorById(this.proveedorService.get_ProductoServicioNegocioEdit().id_proveedor).subscribe({



      next: value => 
      {
        console.log(value)
        let proveedorPronviciasList:Provincia[] = []

        proveedorPronviciasList = Object(value as Object)["provincia"] ;
        console.log(proveedorPronviciasList);
        console.log(this.lista_provincias)

        

        for (let idxTodasProvincias = 0; idxTodasProvincias < this.lista_provincias.length; idxTodasProvincias++) 
          {

         
            for (let idxProveedorProvincias = 0; idxProveedorProvincias < proveedorPronviciasList.length; idxProveedorProvincias++)
              {

                if(this.lista_provincias[idxTodasProvincias].id == proveedorPronviciasList[idxProveedorProvincias].provincia)
                  {

                    this.provinciasFormControl.controls[idxTodasProvincias].setValue(true)            

                  }
              }


            
          }

          //Creo una lista que contiene el estado original de las Procinvias existentes en el Proveedor, despues hare una comparativa entre esta lista y la lista final del control
          this.lista_provincias_EstadoOriginal = this.provinciasFormControl.value;
          console.log( this.lista_provincias_EstadoOriginal)
      },

      error: err => {
        console.error('Error:' + err);
        alert("Hubo un error al cargar los datos, intentelo de nuevo");
        throw new Error(err);

      }


    });
  }

  //Elimna el registro de la lista de enlaces por medio del metodo splice que borra un elemento desde el indice pasado como parametro
  deleteOldAddedEnlace(enlaceProveedorListIdx:any)
  {
    let enlacesProveedorToDelete: EnlacesProveedor;

    console.log(enlaceProveedorListIdx)
    enlacesProveedorToDelete = this.lista_enlacesAntiguos[enlaceProveedorListIdx] as EnlacesProveedor;

    this.lista_enlacesAntiguos.splice(enlaceProveedorListIdx,1);
    this.lista_enlacesAntiguosToDelete.push(enlacesProveedorToDelete);
    this.lista_IDsEnlacesAntiguosToDelete.push(enlacesProveedorToDelete.id as String);

    console.log(this.lista_enlacesAntiguosToDelete)
    console.log(this.lista_enlacesAntiguos)
    console.log(this.lista_IDsEnlacesAntiguosToDelete)

    console.log(enlacesProveedorToDelete)


  }

  deleteNewAddedEnlace(enlaceProveedorListIdx:any)
  {

    this.lista_enlacesNuevos.splice(enlaceProveedorListIdx,1);
    
  }

  //Metodo que se usa para añadir un nuevo objeto de tipo EnlaceProveedor cuyo valor se toma desde el formulario de Agregar un Enlace
  onPressedAddEnlace()
  {
    let enlaceGet = this.enlaceForm.value.enlace as string;
    let enlaceTypeGet =     this.enlaceForm.value.tipoEnlace as string;


    let EnlaceProveedorAdded = {"enlace":enlaceGet, "linkType":enlaceTypeGet};


    this.lista_enlacesNuevos.push(EnlaceProveedorAdded);
    this.enlaceForm.reset();
    
  }

  get provinciasFormControl() {
    return this.postulanteForm.get('provinciasFormControl') as FormArray;
  }


  get f(){
    return this.postulanteForm.controls;
  }
   

  onFileChange(event:any) {

    this.imagesListForm = event.target.files;

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {

                var reader = new FileReader();
     
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.postulanteForm.patchValue({
                      fileSource: this.images
                   });
                }
    
                console.log(this.images)
                reader.readAsDataURL(event.target.files[i]);

        }
    }
  }

 

  onPressedBackButton()
  {

    console.log(this.images)

    console.log(this.postulanteForm.value.fileSource)
    console.log(this.postulanteForm.value.multiple_files)

    this.router.navigate(['inicio/buscarProducto']);
  }


  /*addImageItem(idProducto: string): Promise<any>{
    
    const imagesList:any[] = [];
    this.fileList.forEach((element: any) =>
    {
      imagesList.push(
        {
          imagen: element.thumbUrl,
          name: element.name,
          producto: idProducto
        }
      )

    })

    console.log(imagesList);
    
    return this._imagenProducto.createImagenProducto({imagesList})
  }*/


  onPressedSubmit()
  {


    console.log(this.productoServicioNegocio.id_proveedor);
    
    const proveedorParams = new FormData();

    proveedorParams.append('ruc_cedula',this.postulanteForm.value.RUCCedula as string as string);
    proveedorParams.append('razon_social',this.postulanteForm.value.razonSocial  as string);
    proveedorParams.append('telefono',this.postulanteForm.value.telefono as string);

    proveedorParams.append('correo',this.postulanteForm.value.correo as string);
    proveedorParams.append('ciudad', this.postulanteForm.value.ciudad as string);
    proveedorParams.append('descripcion', this.postulanteForm.value.descripcion as string);
    proveedorParams.append('state', "Activo");

  
      this.proveedorService.updateAndLogicalDeleteProveedorPostulante(proveedorParams, this.productoServicioNegocio.id_proveedor).subscribe({



        next: value => 
        {

          this.alterProveedorProvincia();
          this.createProveedorLinks();
          this.deleteProveedorLinks();


          const imagesList:any[] = [];
          const idProveedor: any = this.productoServicioNegocio.id_proveedor ;



          if (this.imagesListForm) {
            for (let i = 0; i < this.imagesListForm.length; i++) {

              console.log(this.imagesListForm[i])
              
              if( this.imagesListForm[i])
              {
                this.uploadImage( this.imagesListForm[i],idProveedor)
              }
            }
          }
       
          

        },

        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al guardar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }

      


      });

  }
  public createProveedorLinks()
  {

          
        

          const idProveedor: any = this.productoServicioNegocio.id_proveedor ;

          
            const formData: FormData = new FormData();

            formData.append('enlacesProveedor',  JSON.stringify(this.lista_enlacesNuevos));
            
            console.log(JSON.stringify(this.lista_enlacesNuevos))
            console.log(this.lista_enlacesNuevos.toString())

            this.proveedorService.crearEnlacesProveedor(formData, idProveedor).subscribe(
              {
                
        
                next: value =>  console.log("Registrado exitosamente"),
                error: err => {
                  console.error('Error:' + err);
                  alert("Hubo un error al guardar las provincias, intentelo de nuevo");
                  throw new Error(err);
          
                }
              })

          
  }

  public deleteProveedorLinks()
  {

    let   enlacesToDelete: any[] = [];
    enlacesToDelete = this.lista_IDsEnlacesAntiguosToDelete.slice();

    for (let idxEstadoProvincia = 0; idxEstadoProvincia < enlacesToDelete.length; idxEstadoProvincia++) 
      {
        console.log(enlacesToDelete[idxEstadoProvincia]);

      }

    if(enlacesToDelete.length != 0)
      {

        const enlacesDeleteParams = new FormData();
    
        enlacesDeleteParams.append('enlacesIdsList',enlacesToDelete.toString());
       
        this.proveedorService.deleteProveedorEnlacesRegister(enlacesDeleteParams, this.productoServicioNegocio.id_proveedor).subscribe({
  
          next: value => 
          {
          },
  
          error: err => {
            console.error('Error:' + err);
            alert("Hubo un error al eliminar los enlaces del proveedor, intentelo de nuevo");
            throw new Error(err);
    
          }
  
        
  
  
        });


      }

  }

  alterProveedorProvincia()
  {


    console.log(this.productoServicioNegocio.id_proveedor);

    this.lista_provincias_EstadoFinal = this.provinciasFormControl.value;
    let   provinciasToDelete: any[] = [];
    let   provinciasToCreate: any[] = [];
    const idProveedor: any = this.productoServicioNegocio.id_proveedor;

    for (let idxEstadoProvincia = 0; idxEstadoProvincia < this.lista_provincias_EstadoOriginal.length; idxEstadoProvincia++) 
      {

     
        if(this.lista_provincias_EstadoOriginal[idxEstadoProvincia] == true &&
          this.lista_provincias_EstadoFinal[idxEstadoProvincia] == false)
        {

          provinciasToDelete.push(this.lista_provincias[idxEstadoProvincia].id);            

        }
       
        if(this.lista_provincias_EstadoOriginal[idxEstadoProvincia] == false &&
          this.lista_provincias_EstadoFinal[idxEstadoProvincia] == true)
        {

          provinciasToCreate.push(this.lista_provincias[idxEstadoProvincia].id);            

        }
      }

      console.log(this.lista_provincias_EstadoFinal);
      console.log(this.lista_provincias_EstadoOriginal);
      console.log(provinciasToDelete);
      console.log(provinciasToCreate);

      if(provinciasToDelete.length != 0)
      {

        const provinciasDeleteParams = new FormData();
    
        provinciasDeleteParams.append('provinciasIdsList',provinciasToDelete.toString());
       
        this.provinciaService.deleteProveedorProvinciaRegister(provinciasDeleteParams, this.productoServicioNegocio.id_proveedor).subscribe({
  
  
  
          next: value => 
          {
          },
  
          error: err => {
            console.error('Error:' + err);
            alert("Hubo un error al eliminar las provincias, intentelo de nuevo");
            throw new Error(err);
    
          }
  
        
  
  
        });


      }
      



      if(provinciasToCreate.length != 0)
        {

          const provinciasCreateParams = new FormData();
          
          provinciasCreateParams.append('provinciasList',provinciasToCreate.toString());
          provinciasCreateParams.append('proveedor', idProveedor);
          
          this.provinciaService.crearProveedorProvincia(provinciasCreateParams).subscribe(
            {
              
      
              next: value =>  console.log("Registrado exitosamente"),
              error: err => {
                console.error('Error:' + err);
                alert("Hubo un error al guardar las provincias, intentelo de nuevo");
                throw new Error(err);
        
              }
            })

        }
     
      

  }

  uploadImage(file: File, idProveedor:any) {
    const formData: FormData = new FormData();

    formData.append('image_path', file, file.name);
    formData.append('proveedor', idProveedor);

    console.log(file)

    
    this.imagenProveedorService.createImagenProducto(formData).subscribe(
      {
        

        next: value =>           alert("Registrado exitosamente"),
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al guardar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })
  }
}