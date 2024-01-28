import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSubcategoriaTarjetaComponent } from './categoria-subcategoria-tarjeta.component';

describe('CategoriaSubcategoriaTarjetaComponent', () => {
  let component: CategoriaSubcategoriaTarjetaComponent;
  let fixture: ComponentFixture<CategoriaSubcategoriaTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaSubcategoriaTarjetaComponent]
    });
    fixture = TestBed.createComponent(CategoriaSubcategoriaTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
