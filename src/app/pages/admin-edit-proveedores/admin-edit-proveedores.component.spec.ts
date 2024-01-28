import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditProveedoresComponent } from './admin-edit-proveedores.component';

describe('AdminEditProveedoresComponent', () => {
  let component: AdminEditProveedoresComponent;
  let fixture: ComponentFixture<AdminEditProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditProveedoresComponent]
    });
    fixture = TestBed.createComponent(AdminEditProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
