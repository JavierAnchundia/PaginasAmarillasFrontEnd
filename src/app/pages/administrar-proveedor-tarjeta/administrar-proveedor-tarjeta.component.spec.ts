import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarProveedorTarjetaComponent } from './administrar-proveedor-tarjeta.component';

describe('AdministrarProveedorTarjetaComponent', () => {
  let component: AdministrarProveedorTarjetaComponent;
  let fixture: ComponentFixture<AdministrarProveedorTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarProveedorTarjetaComponent]
    });
    fixture = TestBed.createComponent(AdministrarProveedorTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
