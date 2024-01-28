import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAdminProveedorComponent } from './formulario-admin-proveedor.component';

describe('FormularioAdminProveedorComponent', () => {
  let component: FormularioAdminProveedorComponent;
  let fixture: ComponentFixture<FormularioAdminProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioAdminProveedorComponent]
    });
    fixture = TestBed.createComponent(FormularioAdminProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
