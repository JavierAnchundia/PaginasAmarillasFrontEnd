const URL_ROOT = 'https://ariseandshine.pythonanywhere.com/api/core/'
const URL_STATIC = 'https://ariseandshine.pythonanywhere.com';

const URL_SERVICIOS = {
    categorias : URL_ROOT + 'categorias',
    subcategorias : URL_ROOT + 'subcategorias',
    proveedoresActivosAll : URL_ROOT + 'proveedores_activosAll',
    proveedoresActivosFilter : URL_ROOT + 'proveedoresFilter_activos',
    proveedoresPostulantes : URL_ROOT + 'proveedores_postulantes',
    proveedorSetRegistro : URL_ROOT + 'proveedorSetRegistro',
    imagen_proveedor : URL_ROOT + 'imagen_proveedor',
    proveedorCategoriasSubcategorias: URL_ROOT + 'proveedorCategoriasSubcategorias',
    login: URL_ROOT + 'token',
    refresh: URL_ROOT + 'token/refresh',


    url_static: URL_STATIC,


    
   
}

export default URL_SERVICIOS