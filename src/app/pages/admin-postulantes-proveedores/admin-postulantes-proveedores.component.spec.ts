import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostulantesProveedoresComponent } from './admin-postulantes-proveedores.component';

describe('AdminPostulantesProveedoresComponent', () => {
  let component: AdminPostulantesProveedoresComponent;
  let fixture: ComponentFixture<AdminPostulantesProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostulantesProveedoresComponent]
    });
    fixture = TestBed.createComponent(AdminPostulantesProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
