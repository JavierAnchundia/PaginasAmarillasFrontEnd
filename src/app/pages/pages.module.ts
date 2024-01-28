import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HttpClientModule } from '@angular/common/http';
import { ServicioModules } from '../services/service.module'
import { PAGES_ROUTES } from './pages.routes';
import { BuscarProductoComponent } from './buscar-producto/buscar-producto.component';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaSubcategoriaTarjetaComponent } from './buscar-producto/categoria-subcategoria-tarjeta/categoria-subcategoria-tarjeta.component';
import {CategoriaService} from '../services/categoria/categoria.service';
import { FormularioProveedorComponent } from './formulario-proveedor/formulario-proveedor.component';
import { SubcategoriaComponent } from './buscar-producto/subcategoria/subcategoria.component';
import { ProveedorTarjetaComponent } from './proveedor-tarjeta/proveedor-tarjeta.component';
import { ProveedorBusquedaComponent } from './proveedor-busqueda/proveedor-busqueda.component';
import { AdministrarProveedorComponent } from './administrar-proveedor/administrar-proveedor.component';
import { AdministrarProveedorTarjetaComponent } from './administrar-proveedor-tarjeta/administrar-proveedor-tarjeta.component';
import { AdminPostulantesProveedoresComponent } from './admin-postulantes-proveedores/admin-postulantes-proveedores.component';
import { FormularioAdminProveedorComponent } from './formulario-admin-proveedor/formulario-admin-proveedor.component'

import { BrowserModule } from '@angular/platform-browser';
import { AdminEditProveedoresComponent } from './admin-edit-proveedores/admin-edit-proveedores.component';

registerLocaleData(es);


@NgModule({
    declarations: [
      
    
    
  
    BuscarProductoComponent,
    CategoriaSubcategoriaTarjetaComponent,
    FormularioProveedorComponent,
    SubcategoriaComponent,
    ProveedorTarjetaComponent,
    ProveedorBusquedaComponent,
    AdministrarProveedorComponent,
    AdministrarProveedorTarjetaComponent,
    AdminPostulantesProveedoresComponent,
    FormularioAdminProveedorComponent,
    AdminEditProveedoresComponent
  ],
    exports: [
      
    ],
    imports: [
        CommonModule,
        SharedModule,
        ServicioModules,
        PAGES_ROUTES,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormGroup,
        FormControl,
        BrowserModule,
    ],
    providers: [CategoriaService
        ],
})
export class PagesModule { }