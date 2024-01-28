import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorBusquedaComponent } from './proveedor-busqueda.component';

describe('ProveedorBusquedaComponent', () => {
  let component: ProveedorBusquedaComponent;
  let fixture: ComponentFixture<ProveedorBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedorBusquedaComponent]
    });
    fixture = TestBed.createComponent(ProveedorBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
