import {Subcategoria} from './subcategoria.model';
import {Categoria} from './categoria.model';


export class ProductoServicioNegocio{
    constructor(

        public id_proveedor:String,
        public ruc_cedula:String,
        public razon_social: String,
        public telefono: String,
        public correo: String,
        public provincia: String,
        public ciudad:String,
        public descripcion:String,
        public categoria?: any[],
        public subcategorias?: any[],
        public image_path?:String,
        


        
    ){

    }
}