import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorTarjetaComponent } from './proveedor-tarjeta.component';

describe('ProveedorTarjetaComponent', () => {
  let component: ProveedorTarjetaComponent;
  let fixture: ComponentFixture<ProveedorTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedorTarjetaComponent]
    });
    fixture = TestBed.createComponent(ProveedorTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
