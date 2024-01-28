import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { BuscarProductoComponent } from './buscar-producto/buscar-producto.component';
import { ProveedorBusquedaComponent } from './proveedor-busqueda/proveedor-busqueda.component';
import { FormularioProveedorComponent } from './formulario-proveedor/formulario-proveedor.component';




// Guards



const pagesRoutes: Routes = [
    { path: 'home' , component:BuscarProductoComponent, data:{ titulo:' Home '} },
    { path: 'solicitar' , component:FormularioProveedorComponent, data:{ titulo:' Solicitar '} },
    { path: 'busqueda' , component:ProveedorBusquedaComponent, data:{ titulo:' Búsqueda '} },

    { path: '', redirectTo: '/home' },

];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes); 