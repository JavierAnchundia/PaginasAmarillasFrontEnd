import { TestBed } from '@angular/core/testing';

import { ImagenProveedorService } from './imagen-proveedor.service';

describe('ImagenProveedorService', () => {
  let service: ImagenProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
