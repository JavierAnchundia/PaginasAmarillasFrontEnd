import {  Component, Input, Output,OnInit, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Categoria} from '../../../models/categoria.model';
import {CategoriaService} from '../../../services/categoria/categoria.service'
import {Subcategoria} from '../../../models/subcategoria.model';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
})
export class SubcategoriaComponent implements OnInit{

  @Input() subcategoria!: Subcategoria;
  @Output() updateselectedSubcategoria = new EventEmitter<boolean>();


  constructor(public categoriaService: CategoriaService)
  {


  }

  ngOnInit() 
  {

  

  }


  

  onPressedCard()
  {
    this.categoriaService.setsubCategoriaActual(this.subcategoria);
    console.log(this.categoriaService.getCategoriaActual()); 
    this.updateselectedSubcategoria.emit(true)
    
  }
}
