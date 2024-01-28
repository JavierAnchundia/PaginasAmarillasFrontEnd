import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { BuscarProductoComponent } from './pages/buscar-producto/buscar-producto.component';
import { ProveedorBusquedaComponent } from './pages/proveedor-busqueda/proveedor-busqueda.component';
import { AdministrarProveedorComponent } from './pages/administrar-proveedor/administrar-proveedor.component';
import { AdminPostulantesProveedoresComponent } from './pages/admin-postulantes-proveedores/admin-postulantes-proveedores.component';
import { FormularioAdminProveedorComponent } from './pages/formulario-admin-proveedor/formulario-admin-proveedor.component';
import { AdminEditProveedoresComponent } from './pages/admin-edit-proveedores/admin-edit-proveedores.component';
import { authGuard } from './guards/auth.guard';

import { FormularioProveedorComponent } from './pages/formulario-proveedor/formulario-proveedor.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: PagesComponent,
    children: 
    [
      {
        path: 'buscarProducto',
        component: BuscarProductoComponent
      },
      
      { path: 'solicitar' , component:FormularioProveedorComponent, data:{ titulo:' Solicitar '} },
      { path: 'busqueda' , component:ProveedorBusquedaComponent, data:{ titulo:' Búsqueda '} },
      { path: 'administrarProveedor' , component:AdministrarProveedorComponent, data:{ titulo:' Administrar Proveedor'}, canActivate: [authGuard]},
      { path: 'administrarPostulantes' , component:AdminPostulantesProveedoresComponent, data:{ titulo:' Administrar Postulante'}, canActivate: [authGuard] },
      { path: 'crearProveedor' , component:FormularioAdminProveedorComponent, data:{ titulo:' Crear Nuevo Proveedor '}, canActivate: [authGuard] },
      { path: 'editarProveedor' , component:AdminEditProveedoresComponent, data:{ titulo:'Editar Proveedor '},canActivate: [authGuard] },

      {path: '', pathMatch: 'full', redirectTo: 'buscarProducto'}  

    ]
},
  {path: '', pathMatch: 'full', redirectTo: 'inicio'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
