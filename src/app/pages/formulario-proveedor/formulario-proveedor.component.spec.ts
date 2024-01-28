import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProveedorComponent } from './formulario-proveedor.component';

describe('FormularioProveedorComponent', () => {
  let component: FormularioProveedorComponent;
  let fixture: ComponentFixture<FormularioProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioProveedorComponent]
    });
    fixture = TestBed.createComponent(FormularioProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
