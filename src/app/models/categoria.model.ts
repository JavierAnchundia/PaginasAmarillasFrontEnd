import {Subcategoria} from './subcategoria.model';

export class Categoria{
    constructor(
        public nombre: String,
        public image_path: String,
        public subcategorias?: Subcategoria[],

        
    ){

    }
}