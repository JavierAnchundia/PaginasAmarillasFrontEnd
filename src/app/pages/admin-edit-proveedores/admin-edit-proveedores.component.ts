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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  productoServicioNegocio: ProductoServicioNegocio = {} as ProductoServicioNegocio;

  postulanteForm = new FormGroup({
    RUCCedula: new FormControl('',Validators.required),
    razonSocial: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    provincia: new FormControl('',Validators.required),
    ciudad: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    multiple_files: new FormControl(''),
    fileSource: new FormControl('', )


  

  });

  constructor(private router: Router, private navBarService:NavBarService, private proveedorService:ProveedorService,
    private imagenProveedorService:ImagenProveedorService)
  {

  }
  ngOnInit(): void {


    this.productoServicioNegocio = this.proveedorService.get_ProductoServicioNegocioEdit();

    console.log(this.productoServicioNegocio.id_proveedor as string)

    this.postulanteForm.patchValue({
    RUCCedula: this.productoServicioNegocio.ruc_cedula as string,
    razonSocial: this.productoServicioNegocio.razon_social as string,
    telefono: this.productoServicioNegocio.telefono as string,
    correo: this.productoServicioNegocio.correo as string,
    provincia:this.productoServicioNegocio.provincia as string,
    ciudad: this.productoServicioNegocio.ciudad as string,
    descripcion: this.productoServicioNegocio.descripcion as string,
    
    });

    this.proveedorService.getProveedorById(this.proveedorService.get_ProductoServicioNegocioEdit().id_proveedor).subscribe({



      next: value => 
      {


      },

      error: err => {
        console.error('Error:' + err);
        alert("Hubo un error al cargar los datos, intentelo de nuevo");
        throw new Error(err);

      }


    });
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
    proveedorParams.append('provincia', this.postulanteForm.value.provincia as string);
    proveedorParams.append('ciudad', this.postulanteForm.value.ciudad as string);
    proveedorParams.append('descripcion', this.postulanteForm.value.descripcion as string);
    proveedorParams.append('state', "Activo");

  
      this.proveedorService.updateAndLogicalDeleteProveedorPostulante(proveedorParams, this.productoServicioNegocio.id_proveedor).subscribe({



        next: value => 
        {

         

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