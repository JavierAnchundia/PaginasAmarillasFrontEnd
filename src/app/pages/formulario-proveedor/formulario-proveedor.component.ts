import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { NavBarService } from '../../services/navBarInfo/nav-bar.service';
import { ProveedorService } from '../../services/proveedor/proveedor.service';

import {Categoria} from '../../models/categoria.model';
import {ProductoServicioNegocio} from '../../models/productoServicioNegocio.model';
import { Validators } from '@angular/forms';

import {Subcategoria } from 'src/app/models/subcategoria.model';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdministrarProveedorTarjetaComponent} from '../administrar-proveedor-tarjeta/administrar-proveedor-tarjeta.component'
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-formulario-proveedor',
  templateUrl: './formulario-proveedor.component.html',
  styleUrls: ['./formulario-proveedor.component.css'],
  standalone: true,
  imports: [ ReactiveFormsModule,NgFor, NgIf],
})
export class FormularioProveedorComponent {


  postulanteForm = new FormGroup({
    RUCCedula: new FormControl('',Validators.required),
    razonSocial: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    provincia: new FormControl('',Validators.required),
    ciudad: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
   
  });



  constructor(private router: Router, private navBarService:NavBarService, private proveedorService:ProveedorService )
  {

    
  }

  onPressedBackButton()
  {

    this.navBarService.setImPostulante(false );
    this.router.navigate(['inicio/buscarProducto']);

    
  }

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
    proveedorParams.append('state', "Pendiente");

    

    

      
      this.proveedorService.postProveedorPostulante(proveedorParams).subscribe({



        next: value => 
        {

          alert("Registrado exitosamente");

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
}
