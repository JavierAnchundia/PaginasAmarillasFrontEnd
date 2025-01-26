const URL_ROOT = 'http://127.0.0.1:8000/api/core/'
const URL_STATIC = 'http://127.0.0.1:8000';

const URL_SERVICIOS = {
    provincias : URL_ROOT + 'provincias',
    proveedorProvincias : URL_ROOT + 'proveedorProvincias',
    proveedorProvinciasViewSet : URL_ROOT + 'proveedorProvinciasViewSet',
    proveedorEnlaces : URL_ROOT + 'proveedorEnlaces',
    proveedorDeleteEnlaces: URL_ROOT + 'proveedorEnlacesDelete',
    
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