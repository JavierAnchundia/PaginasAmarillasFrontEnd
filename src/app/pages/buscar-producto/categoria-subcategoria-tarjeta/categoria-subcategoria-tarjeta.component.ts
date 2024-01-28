import { Component, Input, Output,OnInit, EventEmitter  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {Categoria} from '../../../models/categoria.model';
import { NgFor } from '@angular/common';
import {CategoriaService} from '../../../services/categoria/categoria.service'
import { Router } from '@angular/router';
import URL_SERVICIOS from 'src/app/config/config';


@Component({
  selector: 'app-categoria-subcategoria-tarjeta',
  templateUrl: './categoria-subcategoria-tarjeta.component.html',
  styleUrls: ['./categoria-subcategoria-tarjeta.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
})
export class CategoriaSubcategoriaTarjetaComponent implements OnInit {

  @Input() categoria!: Categoria;
  @Output() updateinSubCategoria = new EventEmitter<boolean>();

  faMagnifyingGlass = faMagnifyingGlass;

  url_backend: string = URL_SERVICIOS.url_static;

  
  constructor(public categoriaService: CategoriaService, public router:Router)
  {


  }

  ngOnInit() 
  {

  

  }


  

  onPressedCard()
  {
    this.categoriaService.setCategoriaActual(this.categoria);
    console.log(this.categoriaService.getCategoriaActual()); 
    this.updateinSubCategoria.emit(true)
    
  }

}
