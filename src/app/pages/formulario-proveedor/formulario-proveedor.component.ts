import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { NavBarService } from '../../services/navBarInfo/nav-bar.service';
import { ProveedorService } from '../../services/proveedor/proveedor.service';

import {Categoria} from '../../models/categoria.model';
import {Provincia} from '../../models/provincia.model';
import {EnlacesProveedor} from '../../models/enlacesProveedor.model';

import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model';
import { Validators } from '@angular/forms';

import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdministrarProveedorTarjetaComponent} from '../administrar-proveedor-tarjeta/administrar-proveedor-tarjeta.component'
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { initCollapses, }from 'flowbite'


import { FormArray } from '@angular/forms';
import { ProvinciaService } from 'src/app/services/provincia/provincia.service';


@Component({
  selector: 'app-formulario-proveedor',
  templateUrl: './formulario-proveedor.component.html',
  styleUrls: ['./formulario-proveedor.component.css'],
  standalone: true,
  imports: [ ReactiveFormsModule,NgFor, NgIf],
})
export class FormularioProveedorComponent implements OnInit{

  lista_provincias: Provincia[] = [];
  lista_enlacesProveedor: EnlacesProveedor[] = [];

  postulanteForm = new FormGroup({
    RUCCedula: new FormControl('',Validators.required),
    razonSocial: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    ciudad: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    provinciasFormControl: this.formBuilder.array([]),

  });


  enlaceForm = new FormGroup({
    tipoEnlace: new FormControl('',Validators.required),
    enlace: new FormControl('',Validators.required),


  });



  constructor(private router: Router, private formBuilder: FormBuilder,private navBarService:NavBarService, public categoriaService: CategoriaService,
     private proveedorService:ProveedorService, public provinciaService:ProvinciaService )
  {

    
  }

  ngOnInit(): void 
  {

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

        
        },
        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al cargar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }
      })
  }

  get provinciasFormControl() {
    return this.postulanteForm.get('provinciasFormControl') as FormArray;
  }



  get f(){
    return this.postulanteForm.controls;
  }
  
  onPressedBackButton()
  {

    this.navBarService.setImPostulante(false);
    console.log(this.navBarService.imPostulante);

    this.router.navigate(['inicio/buscarProducto']);

    
  }

  onPressedAddEnlace()
  {
    let enlaceGet = this.enlaceForm.value.enlace as string;
    let enlaceTypeGet =     this.enlaceForm.value.tipoEnlace as string;


    let EnlaceProveedorAdded = {"enlace":enlaceGet, "linkType":enlaceTypeGet};


    this.lista_enlacesProveedor.push(EnlaceProveedorAdded);

    this.enlaceForm.reset();
    
    console.log(this.lista_enlacesProveedor)
  }


  deleteAddedEnlace(enlaceProveedorListIdx:any)
  {

    this.lista_enlacesProveedor.splice(enlaceProveedorListIdx,1);

  }

  onPressedSubmit()
  {

    const proveedorParams = new FormData();

      
    proveedorParams.append('ruc_cedula',this.postulanteForm.value.RUCCedula as string);
    proveedorParams.append('razon_social',this.postulanteForm.value.razonSocial as string);
    proveedorParams.append('telefono',this.postulanteForm.value.telefono as string);

    proveedorParams.append('correo',this.postulanteForm.value.correo as string);
    //proveedorParams.append('provincia', this.postulanteForm.value.provincia as string);
    proveedorParams.append('ciudad', this.postulanteForm.value.ciudad as string);
    proveedorParams.append('descripcion', this.postulanteForm.value.descripcion as string);
    proveedorParams.append('state', "Pendiente");

    

    

      
      this.proveedorService.postProveedorPostulante(proveedorParams).subscribe({



        next: proveedor => 
        {

          this.createProveedorPronvincia(proveedor);
          this.createProveedorLinks(proveedor);

        },

        error: err => {
          console.error('Error:' + err);
          alert("Hubo un error al guardar los datos, intentelo de nuevo");
          throw new Error(err);
  
        }


      });
      
      

        


          /*this.id_camposanto = data['id_camposanto']
          this.postCoordenadas();
          let lenCadena = String(this.redList.value[0].redSocial);
          if(this.redList.length>0 || lenCadena.length>0){
            this.postRedesSociales();
          }*/
      

     


  }

  public createProveedorPronvincia(proveedor:any)
  {

          
          console.log("Registrado Proveedor")
          console.log("Mi VALUE" + proveedor)
          console.log(proveedor)

          const idProveedor: any = Object(proveedor as Object)["data"]["id_proveedor"] ;
          let   provinciasPostList: any[] = [];

          console.log(idProveedor);


          for (let i = 0; i < this.provinciasFormControl.controls.length; i++) 
          {

            console.log(this.provinciasFormControl.controls[i])
            console.log(this.lista_provincias[i].id)

          
            if(this.provinciasFormControl.controls[i].value == true)
            {
              provinciasPostList.push(this.lista_provincias[i].id)
                        
            }
          }


          if(provinciasPostList.length != 0)
          {
            const formData: FormData = new FormData();

            formData.append('provinciasList', provinciasPostList.toString());
            formData.append('proveedor', idProveedor);
            
            this.provinciaService.crearProveedorProvincia(formData).subscribe(
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




  public createProveedorLinks(proveedor:any)
  {

          
          console.log("Registrado Proveedor Links")
          console.log("Mi VALUE" + proveedor)
          console.log(proveedor)

          const idProveedor: any = Object(proveedor as Object)["data"]["id_proveedor"] ;

          
            const formData: FormData = new FormData();

            formData.append('enlacesProveedor',  JSON.stringify(this.lista_enlacesProveedor));
            
            console.log(JSON.stringify(this.lista_enlacesProveedor))
            console.log(this.lista_enlacesProveedor.toString())

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
}
