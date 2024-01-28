import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { NavBarService } from '../../services/navBarInfo/nav-bar.service';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { ImagenProveedorService } from '../../services/imagen/imagen-proveedor.service';


import { throwError } from 'rxjs';

import {Categoria} from '../../models/categoria.model';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model';

import {Subcategoria } from 'src/app/models/subcategoria.model';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdministrarProveedorTarjetaComponent} from '../administrar-proveedor-tarjeta/administrar-proveedor-tarjeta.component'
import { Router,Event } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-admin-proveedor',
  templateUrl: './formulario-admin-proveedor.component.html',
  styleUrls: ['./formulario-admin-proveedor.component.css'],
  standalone: true,
  imports: [ ReactiveFormsModule,NgFor, NgIf],
})
export class FormularioAdminProveedorComponent implements OnInit{


  images : any = [];
  imagesListForm : Array<File> = [];
  lista_categories: Categoria[] = [];
  lista_subcategories: Subcategoria[] = [];

  
  postulanteForm = new FormGroup({
    RUCCedula: new FormControl('',Validators.required),
    razonSocial: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    provincia: new FormControl('',Validators.required),
    ciudad: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    multiple_files: new FormControl(''),
    fileSource: new FormControl('', ),
    categoriasFormControl: this.formBuilder.array([]),
    subcategoriasFormControl: this.formBuilder.array([]),




  });

  constructor(private router: Router, private navBarService:NavBarService, private proveedorService:ProveedorService,
    private imagenProveedorService:ImagenProveedorService, private formBuilder: FormBuilder, public categoriaService: CategoriaService)
  {

    
  }
  

  ngOnInit(): void {
      
    this.categoriaService.getCategorias().subscribe(
      {
        

        next: value => 
        {
          this.lista_categories = value as Categoria[];
          
          console.log(value);
          console.log( this.lista_categories[1]);

          for (var categoria of this.lista_categories) {
            this.categoriasFormControl.push(this.formBuilder.control(''));
            console.log(categoria)
          }

          console.log(this.categoriasFormControl.controls)
        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })

    
      this.categoriaService.getCategorias().subscribe(
        {
          
  
          next: value => 
          {
            this.lista_categories = value as Categoria[];
            
            console.log(value);
            console.log( this.lista_categories[1]);
  
            for (var categoria of this.lista_categories) {
              this.categoriasFormControl.push(this.formBuilder.control(''));
              console.log(categoria)
            }
  
            console.log(this.categoriasFormControl.controls)
          
          },
          error: err => {
            console.error('Error:' + err);
            alert("Hubo un error al cargar los datos, intentelo de nuevo");
            throw new Error(err);
    
          }
        })


      
        //Esta parte detecta los cambios en los checkbox de las categorias
      this.categoriasFormControl.valueChanges.subscribe
      (
        categoriasList => 
        {

          this.lista_subcategories = [];
          this.subcategoriasFormControl.clear();

          //Recorro con un for cada uno de los controles
          for (let i = 0; i < categoriasList.length; i++) 
          {
              
            console.log(categoriasList[i])

            if(categoriasList[i] == true)
            {
              const categoriaForm = new FormData();

              categoriaForm.append('categoria',this.lista_categories[i].nombre as string);
  
              this.categoriaService.getSubcategoriasInCategoria(categoriaForm).subscribe(
                {
                  
  
                  next: value => 
                  {
  
                    
                    for (var subcategoria of value as any as Subcategoria[]) {
                      
                      this.lista_subcategories.push(new Subcategoria(this.lista_categories[i].nombre.concat("-").concat(subcategoria.nombre as string) ))
                      this.subcategoriasFormControl.push(this.formBuilder.control(''));

                    }
  
  
                    
                    console.log(this.lista_subcategories)
                  
                  },
                  error: err => {
                    console.error('Error:' + err);
                    alert("Hubo un error al cargar los datos, intentelo de nuevo");
                    throw new Error(err);
            
                  }
                })

            }
            
          }

          
        }

      );


  }

  get categoriasFormControl() {
    return this.postulanteForm.get('categoriasFormControl') as FormArray;
  }

  get subcategoriasFormControl() {
    return this.postulanteForm.get('subcategoriasFormControl') as FormArray;
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

    console.log(this.categoriasFormControl.controls[0].value)
    console.log(this.lista_categories[0].nombre)


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

    const proveedorParams = new FormData();

      
    proveedorParams.append('ruc_cedula',this.postulanteForm.value.RUCCedula as string);
    proveedorParams.append('razon_social',this.postulanteForm.value.razonSocial as string);
    proveedorParams.append('telefono',this.postulanteForm.value.telefono as string);

    proveedorParams.append('correo',this.postulanteForm.value.correo as string);
    proveedorParams.append('provincia', this.postulanteForm.value.provincia as string);
    proveedorParams.append('ciudad', this.postulanteForm.value.ciudad as string);
    proveedorParams.append('descripcion', this.postulanteForm.value.descripcion as string);
    proveedorParams.append('state', "Activo");

    

    console.log(this.categoriasFormControl.controls)
    
    console.log(this.images)

    console.log(this.postulanteForm.value.fileSource)
    console.log(this.postulanteForm.value.multiple_files)
      
      this.proveedorService.postProveedorPostulante(proveedorParams).subscribe({



        next: value => 
        {

          console.log("Registrado Proveedor")
          console.log("Mi VALUE" + value)
          console.log(value)

          const imagesList:any[] = [];
          const idProveedor: any = Object(value as Object)["data"]["id_proveedor"] ;
          let   subcategoriasPostList: any[] = [];

          console.log(idProveedor);
          console.log(this.imagesListForm);


          for (let i = 0; i < this.subcategoriasFormControl.controls.length; i++) 
          {

            console.log(this.subcategoriasFormControl.controls[i])
            console.log(this.lista_subcategories[i].nombre)

          
            if(this.subcategoriasFormControl.controls[i].value == true)
            {
              subcategoriasPostList.push(this.lista_subcategories[i].nombre)
                        
            }
          }


          if(subcategoriasPostList.length != 0)
          {
            const formData: FormData = new FormData();

            formData.append('subcategoriasList', subcategoriasPostList.toString());
            formData.append('proveedor', idProveedor);
            
            this.categoriaService.crearProveedorCategoriaSubcategoria(formData).subscribe(
              {
                
        
                next: value =>  console.log("Registrado exitosamente"),
                error: err => {
                  console.error('Error:' + err);
                  alert("Hubo un error al guardar las categorias y subcategorias, intentelo de nuevo");
                  throw new Error(err);
          
                }
              })

          }
         


          
          if (this.imagesListForm) {
            for (let i = 0; i < this.imagesListForm.length; i++) {

              console.log(this.imagesListForm[i])
              
              if( this.imagesListForm[i])
              {
                this.uploadImage( this.imagesListForm[i],idProveedor)
              }
            }

            alert("Proveedor registrado correctamente");

          }
       
          

        },

        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al guardar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }

      


      });
        
       
      


      
      

      


  }


  uploadImage(file: File, idProveedor:any) {
    const formData: FormData = new FormData();

    formData.append('image_path', file, file.name);
    formData.append('proveedor', idProveedor);

    console.log(file)

    
    this.imagenProveedorService.createImagenProducto(formData).subscribe(
      {
        

        next: value =>           console.log("Registrado exitosamente"),
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al guardar las imágenes, intentelo de nuevo");
          throw new Error(err);
  
        }
      })
  }
}
